import React from "react";
import { SearchCard } from "./SearchCard/SearchCard";
import { ResultsCard } from "./ResultsCard/ResultsCard";
import { PlayListCard } from "./PlayListCard/PlayListCard";

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
    <>
    <SearchCard />
    <ResultsCard responseObj={mockResponse} />
    <PlayListCard />
    </>
  );
}

export default App;