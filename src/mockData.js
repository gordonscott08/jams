const parentObj = {
    tracks: {
      items: [
        {
          id: '6U4VqEHy4n5VeiH4pQPL24',
          name: 'You\'re Welcome',
          artists: [
            {
              name: 'Dwayne Johnson'
            }
          ],
          album: {
            name: 'Moana Soundtrack'
          }
        },
        {
          id: '2bwSCIuNtVrQPVddCi8sOW',
          name: 'Where you are',
          artists: [
            {
              name: 'Christopher Jackson'
            }
          ],
          album: {
            name: 'Moana Soundtrack'
          }
        }
      ]
    }
  }

  const newToken = 'abcdefghijklmnopqrstuvwxyz';

  function renewToken() {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (Math.random()<=.999) {
                console.log('Response 200');
                resolve(newToken);
            } else {
                reject('Simulated Retrieval Error');
            }
        },(Math.floor(Math.random()*2000)))
    })
  }


  function getTracks(searchTerm) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (Math.random()<=.999) {
                console.log('Response 200');
                resolve(parentObj);
                console.log(`Received request for ${searchTerm}`);
            } else {
                reject('Simulated Retrieval Error');
            }
        },(Math.floor(Math.random()*2000)))
    })
  }



  export { renewToken, getTracks };