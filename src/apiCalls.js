const clientId = 'e68bafb5cea6442ab13d02840d1862cc'; //this is public information
const redirectUrl = 'http://localhost:3000';

const currentToken = {
    get access_token() { return localStorage.getItem('access_token') || null; },
    get refresh_token() { return localStorage.getItem('refresh_token') || null; },
    get expires_in() { return localStorage.getItem('refresh_in') || null },
    get expires() { return localStorage.getItem('expires') || null },
  
    save: function (response) {
      const { access_token, refresh_token, expires_in } = response;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('expires_in', expires_in);
  
      const now = new Date();
      const expiry = new Date(now.getTime() + (expires_in * 1000));
      localStorage.setItem('expires', expiry);
    }
  };

let spotifyUserId = '';     //will be populated by getUserId
let playlistId = '';        //will be populated by postNewPlaylsit

async function requestToken(codeParam) {
    const url = "https://accounts.spotify.com/api/token";
    const code_verifier = localStorage.getItem('code_verifier');

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              client_id: clientId,
              grant_type: 'authorization_code',
              code: codeParam,
              redirect_uri: redirectUrl,
              code_verifier: code_verifier,
            }),
          });
        if (response.ok) {
            console.log('Success. Token generated.')
            return await response.json();
        }
        else {
            throw new Error(`Error. Response came back with status ${response.status}`);
        }
    } catch(networkError) {
        console.log(networkError.message);
    }
}

async function redirectToSpotifyAuthorize() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomValues = crypto.getRandomValues(new Uint8Array(64));
    const randomString = randomValues.reduce((acc, x) => acc + possible[x % possible.length], "");
    const authorizationEndpoint = "https://accounts.spotify.com/authorize";
    const scope = 'playlist-modify-public playlist-modify-private user-top-read user-read-email user-read-private';
    const randomState = Math.floor(Math.random()*1000000)
    localStorage.setItem("sentStateParam",randomState);
  
    const code_verifier = randomString;
    const data = new TextEncoder().encode(code_verifier);
    const hashed = await crypto.subtle.digest('SHA-256', data);
  
    const code_challenge_base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  
    window.localStorage.setItem('code_verifier', code_verifier);
  
    const authUrl = new URL(authorizationEndpoint)
    const params = {
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      code_challenge_method: 'S256',
      code_challenge: code_challenge_base64,
      redirect_uri: redirectUrl,
      state: randomState,
    };
  
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
  }

  async function refreshToken() {
    const url = "https://accounts.spotify.com/api/token";
    console.log('Beginning token refresh...')
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
              client_id: clientId,
              grant_type: 'refresh_token',
              refresh_token: currentToken.refresh_token
            }),
          });
          if (response.ok) {
            console.log('Success. Token generated.')
            const token = await response.json();
            currentToken.save(token);
            return token;
        }
        else {
            throw new Error(`Token Refresh Error. Response is status ${response.status}`);
        }          
    } catch(error) {console.log(`Connection error on refreshToken: ${error.message}`)}
  }

async function searchSpotify (userInput) {
    const baseUrl = 'https://api.spotify.com/v1';
    const endpoint = '/search?';
    const queryParam = 'q=' + encodeURIComponent(userInput);
    const typeParam = '&type=' + encodeURIComponent('track');
    const extendedUrl = baseUrl + endpoint + queryParam + typeParam;
    const clientCredential = currentToken.access_token;

    if (!userInput) {
        alert('Please enter a search term first.')
        return
    }
    try {
        const response = await fetch(extendedUrl,{
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + clientCredential
            }
        });
        //if the response is ok...render results.
        if (response.ok) {
            console.log(`OK. Token accepted. Response ${response.status}.`)
            const jsonResponse = await response.json();
            return jsonResponse;
        //if the token is expired...generate a new token and try one more time.
        } else if (response.status === 401) {
            console.log(`Token is expired. Requesting new token...`);
            try {
                const newTokenResponse = await refreshToken();
                console.log('Making second request to endpoint...');
                try {
                    const secondTryResponse = await fetch(extendedUrl,{
                        method: 'GET',
                        headers: {
                            'Authorization' : 'Bearer ' + newTokenResponse.access_token
                        }
                    });
                if (secondTryResponse.ok) {
                    console.log(`Success: second endpoint attempt; response ${secondTryResponse.status}.`);
                    const secondTryJson = await secondTryResponse.json();
                    return secondTryJson;
                } else {
                    console.log(`Error on second endpoint request. Response ${response.status}`)
                }
                } catch(err) {console.log(`Second attempt at endpoint hit an error: ${err.message}`)}
            } catch(tokenGenerationError) {
                console.log(`New token generation hit an error: ${tokenGenerationError.message}.`)
            }
        } else {console.log(`First endpoint request came back from Spotify with status ${response.status}.`)}
    } catch(networkError) {
        console.log(`We hit a general error: ${networkError.message}.`);
    }
}


async function getUserId() {
    const baseUrl = 'https://api.spotify.com/v1';
    const endpoint = '/me';
    const extendedUrl = baseUrl + endpoint;
    const clientCredential = currentToken.access_token;

    try {
        const response = await fetch(extendedUrl,{
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + clientCredential
            }
        });
        if (response.ok) {
            console.log(`OK. Token accepted. Response ${response.status}.`)
            const jsonResponse = await response.json();
            spotifyUserId = jsonResponse.id;
            console.log(`UserId is ${jsonResponse.id}`);
        //if the token is expired...generate a new token and try one more time.
        } else if (response.status === 401) {
            console.log(`Token is expired. Requesting new token...`);
            try {
                const newTokenResponse = await refreshToken();
                console.log('Making second request to endpoint...');
                try {
                    const secondTryResponse = await fetch(extendedUrl,{
                        method: 'GET',
                        headers: {
                            'Authorization' : 'Bearer ' + newTokenResponse.access_token
                        }
                    });
                if (secondTryResponse.ok) {
                    console.log(`Success: second endpoint attempt; response ${secondTryResponse.status}.`);
                    const secondTryJson = await secondTryResponse.json();
                    spotifyUserId = secondTryJson.id;
                    console.log(secondTryJson.id);
                } else {
                    console.log(`Error on second endpoint request. Response ${response.status}`)
                }
                } catch(err) {console.log(`Second attempt at endpoint hit an error: ${err.message}`)}
            } catch(tokenGenerationError) {
                console.log(`New token generation hit an error: ${tokenGenerationError.message}.`)
            }
        } else {console.log(`First endpoint request came back from Spotify with status ${response.status}.`)}
    } catch(networkError) {
        console.log(`We hit a general error: ${networkError.message}.`);
    }
}


async function postNewPlaylist (playlistName) {
    const baseUrl = 'https://api.spotify.com/v1';
    const endpoint = '/users/'+spotifyUserId+'/playlists';
    const extendedUrl = baseUrl + endpoint;
    const clientCredential = currentToken.access_token;
    const requestBody = JSON.stringify({name: playlistName});

    try {
        const response = await fetch(extendedUrl,{
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + clientCredential,
                'Content-Type': 'application/json',
            },
            body: requestBody,
        });
        if (response.ok) {
            console.log(`OK. Token accepted. Response ${response.status}.`)
            const jsonResponse = await response.json();
            playlistId = jsonResponse.id;
            console.log(`New playlist registered: ${jsonResponse.name}`);
        //if the token is expired...generate a new token and try one more time.
        } else if (response.status === 401) {
            console.log(`Token is expired. Requesting new token...`);
            try {
                const newTokenResponse = await refreshToken();
                console.log('Making second request to endpoint...');
                try {
                    const secondTryResponse = await fetch(extendedUrl,{
                        method: 'GET',
                        headers: {
                            'Authorization' : 'Bearer ' + newTokenResponse.access_token
                        }
                    });
                if (secondTryResponse.ok) {
                    console.log(`Success: second endpoint attempt; response ${secondTryResponse.status}.`);
                    const secondTryJson = await secondTryResponse.json();
                    playlistId = secondTryJson.id;
                    console.log(`New playlist registered: ${secondTryJson.name}`);
                } else {
                    console.log(`Error on second endpoint request. Response ${response.status}`)
                }
                } catch(err) {console.log(`Second attempt at endpoint hit an error: ${err.message}`)}
            } catch(tokenGenerationError) {
                console.log(`New token generation hit an error: ${tokenGenerationError.message}.`)
            }
        } else {console.log(`First endpoint request came back from Spotify with status ${response.status}.`)}
    } catch(networkError) {
        console.log(`We hit a general error: ${networkError.message}.`);
    }
}


async function postTracksToPlaylist (formattedTracksArr) {
    const baseUrl = 'https://api.spotify.com/v1';
    const endpoint = '/playlists/'+playlistId+'/tracks';
    const extendedUrl = baseUrl + endpoint;
    const clientCredential = currentToken.access_token;
    const requestBody = JSON.stringify({uris: formattedTracksArr});

    try {
        const response = await fetch(extendedUrl,{
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + clientCredential,
                'Content-Type': 'application/json',
            },
            body: requestBody,
        });
        if (response.ok) {
            console.log(`OK. Token accepted. Response ${response.status}.`)
            const jsonResponse = await response.json();
            console.log(jsonResponse.uris);
        //if the token is expired...generate a new token and try one more time.
        } else if (response.status === 401) {
            console.log(`Token is expired. Requesting new token...`);
            try {
                const newTokenResponse = await refreshToken();
                console.log('Making second request to endpoint...');
                try {
                    const secondTryResponse = await fetch(extendedUrl,{
                        method: 'GET',
                        headers: {
                            'Authorization' : 'Bearer ' + newTokenResponse.access_token
                        }
                    });
                if (secondTryResponse.ok) {
                    console.log(`Success: second endpoint attempt; response ${secondTryResponse.status}.`);
                    const secondTryJson = await secondTryResponse.json();
                    console.log(secondTryJson.uris);
                } else {
                    console.log(`Error on second endpoint request. Response ${response.status}`)
                }
                } catch(err) {console.log(`Second attempt at endpoint hit an error: ${err.message}`)}
            } catch(tokenGenerationError) {
                console.log(`New token generation hit an error: ${tokenGenerationError.message}.`)
            }
        } else {console.log(`First endpoint request came back from Spotify with status ${response.status}.`)}
    } catch(networkError) {
        console.log(`We hit a general error: ${networkError.message}.`);
    }
}



  export {currentToken, requestToken, redirectToSpotifyAuthorize, searchSpotify, getUserId, postNewPlaylist, postTracksToPlaylist}