import React from "react";

function Node({node, onClick, isOrigin = false}) {

  let position = isOrigin ? [0, 0] : [node.x, node.y]; 

  const AuthorNode = () => {
    return (
      <g>
        <text x={position[0]} y={position[1] + 50} textAnchor="middle">
        {node.content}
      </text>
      <circle cx={position[0]} cy={position[1]} r={25}/>
      </g>
    )
  }
  const SubjectNode = () => {
    return (
      <g>
      <text x={position[0]} y={position[1]} textAnchor="right">
        {node.content}
      </text>
      </g>
    )
  }

  const BookNode = () => {
    return (
      <g>
        <text x={position[0]} y={position[1]} textAnchor="middle">
        {node.content}
      </text>
      <rect x={position[0]} y={position[1]} height={80} width={50}/>
      </g>
    )
  }

  switch(node.type) {
    case "Subject":
      return SubjectNode();
    case "Author":
      return AuthorNode();
    case "Book":
      return BookNode();
  }

}



export default Node;
