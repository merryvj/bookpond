import {useState, useEffect} from 'react'

let data = [
    {
      type: "Subject",
      content: "Philosophy & Psychology",
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

  data = data.map(d => {
    return {
      ...d,
      children: [
        {
          type: "Book",
          content: d.content,
        },
        {
          type: "Book",
          content: d.content,
        },
        {
          type: "Author",
          content: d.content,
        },
        {
          type: "Author",
          content: d.content,
        },
        {
          type: "Subject",
          content: d.content,
        },
        {
          type: "Subject",
          content: d.content,
        }
      ]
    }
  })

  data = {
    content: "Books",
    children: [...data]
  }

function useQueryData(query) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        setItems(data);
      }, [query]);
  return [items]
}

export default useQueryData