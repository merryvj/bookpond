import React, {useState} from 'react'
import Graph from './assets/components/Graph'

import './App.css'

function App() {


  const data = [
    {
      type: "Subject",
      content: "Philosophy & Psychology"
    },
    {
      type: "Subject",
      content: "Religion"
    },
    {
      type: "Subject",
      content: "Social Sciences"
    },
    {
      type: "Subject",
      content: "Language"
    },
    {
      type: "Subject",
      content: "Science"
    },
    {
      type: "Subject",
      content: "Art"
    },
    {
      type: "Subject",
      content: "Technology"
    },
    {
      type: "Subject",
      content: "Literature"
    },
    {
      type: "Subject",
      content: "History & Geography"
    },
    {
      type: "Author",
      content: "Octavia Butler"
    },
    {
      type: "Author",
      content: "Octavia Butler"
    },
    {
      type: "Author",
      content: "Octavia Butler"
    },
    {
      type: "Book",
      content: "The Catcher in the Rye"
    },
    {
      type: "Book",
      content: "The Catcher in the Rye"
    },
    {
      type: "Book",
      content: "The Catcher in the Rye"
    },

  ]
  
  return (
    <div>
      {(data.length === 0) ? (
        <p>Loading...</p>
      ) : (
        <Graph data={data}/>
      )}
    </div>
  )}

export default App