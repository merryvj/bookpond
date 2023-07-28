import React, { useState, useCallback, useEffect, useRef, useContext} from "react";
import useGraphState from "../hooks/useGraphState";
import useBookData from "../hooks/useBookData";
import * as d3 from "d3";
import { zoom } from "d3-zoom";
import { useSpring, animated } from '@react-spring/web'
import { GraphContext, GraphDispatchContext } from '../hooks/useGraphContext'


function ForceGraph() {
  const [focusedNode, setFocusedNode] = useState({ title: "test", id: 0});
  const {nodeData, linkData} = useBookData(focusedNode);
  const [state, dispatch] = useGraphState({nodeData, linkData});


  const handleClick = useCallback(
    (node) => {

      //set clicked node as the origin node
      setFocusedNode(node);
      
      dispatch({
        type: 'SelectNode',
        origin: node
      })

      //get data related to the focused node

      //add new nodes from the new data

      //if there's at least one ancestor for clicked nodes, add a link

      //fade out nodes that were not clicked
    },
    [nodeData]
  );

  return (
    <GraphContext.Provider value={state}>
        <GraphDispatchContext.Provider value={dispatch}>
            <Graph nodeData={nodeData} linkData={linkData} handleNodeClick={handleClick} />
        </GraphDispatchContext.Provider>

    </GraphContext.Provider>
  );
}

function Graph({ nodeData, linkData, handleNodeClick }) {
    const svgRef = useRef();
    const [animatedNodes, setAnimatedNodes] = useState([]);
    const [animatedLinks, setAnimatedLinks] = useState([]);
    const graph = useContext(GraphContext);

  // re-create animation every time nodes change
  useEffect(() => {
    const simulation = d3.forceSimulation(nodeData)
    .force("charge", d3.forceManyBody().strength(20))
    .force("collide", d3.forceCollide(50))
    .force("link", d3.forceLink(linkData)
     .id(function(d,i) {
         return d.id
     }).strength(2))

    // update state on every frame
    simulation.on("tick", () => {
      setAnimatedNodes([...simulation.nodes()]);
      //setAnimatedLinks([...simulation.links()]);
    });

    // copy nodes into simulation
    simulation.nodes([...nodeData]);
    

    // slow down with a small alpha
    simulation.alpha(0.02).restart();

    // stop simulation on unmount
    return () => simulation.stop();
  }, [nodeData]);

  

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const zoomBehavior = zoom()
      .scaleExtent([0.5, 5]) // Set the minimum and maximum zoom level
      .on("zoom", handleZoom);

    svg.call(zoomBehavior);
    
    function handleZoom(e) {
      // Get the zoom transform
      const transform = e.transform;

      // Apply the zoom transform to the elements you want to zoom
      svg.selectAll("g").attr("transform", transform);
    }
  }, [])

  return (
    <>
      <svg
        ref={svgRef}
        width={"100vw"}
        height={"100vh"}
        viewBox="-500 -500 1000 1000"
      >
        {animatedNodes.map((node) => (
          <Node node={node} onClick={() => handleNodeClick(node)} focused={graph.origin.id === node.id}/>
        ))}
      </svg>
    </>
  );
}

function Node({node, onClick, focused}) {

    const springs = useSpring({
        config: {
            mass: 5,
            friction: 100,
            tension: 300,
        },
        from: { opacity: 0, scale: 0},
        to: { opacity: 1, scale: 1},
    })

    const isFocused = useRef(false);

    useEffect(() => {
        isFocused.current = focused;
    }, [focused])

    return (
        <g key={node.id} onClick={onClick}>
            {/* <circle
            onClick={() => handleNodeClick(node)}
            cx={node.x}
            cy={node.y}
            r={20}
            stroke="black"
            fill="transparent"
          /> */}
          <animated.text x={node.x} y={node.y} textAnchor={"middle"} fill={focused ? "blue" : "black"}  style={springs}>{node.title}</animated.text>
    </g>
    )
}

export default ForceGraph;
