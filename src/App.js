import React from "react";
import { PlayListApp } from "./PlayListApp/PlayListApp";

const mockResponse = {
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


function App() {
  return (
    <PlayListApp responseObj={mockResponse} />
  );
}

export default App;