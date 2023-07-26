import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { zoom } from "d3-zoom";
import Node from "./Node";

function Graph({ data, onZoom}) {
  const svgRef = useRef();
  const root = d3.hierarchy(data);
  const [nodes, setNodes] = useState(root.descendants());
  const [animatedNodes, setAnimatedNodes] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [visibleNodes, setVisibleNodes] = useState(root.children);


  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const zoomBehavior = zoom()
      .scaleExtent([0.5, 5]) // Set the minimum and maximum zoom level
      .on("zoom", handleZoom);

    svg.call(zoomBehavior);
    
    function handleZoom(e) {

      //find node being zoomed into
      let scale = -e.transform.k;
      

      if (e.transform.k === 5 && zoomLevel === 0) {
        //let focusedNode = sim.find(e.transform.x/scale, e.transform.y / scale, 200);
        //sim.nodes(focusedNode.children);

        setZoomLevel(1);
      } else if (e.transform.k < 1) {
        setZoomLevel(0);
      }

      // Get the zoom transform
      const transform = e.transform;

      // Apply the zoom transform to the elements you want to zoom
      svg.selectAll("g").attr("transform", transform);
    }

    updateSim();
    
  }, []);


  function updateSim() {
    const sim = d3
      .forceSimulation()
      .force("charge", d3.forceManyBody().strength(100))
      .force("collide", d3.forceCollide(50))

    sim.on("tick", () => {
      setAnimatedNodes([...sim.nodes()]);
    });

    sim.nodes(nodes);
    console.log(animatedNodes);
    sim.alpha(0.1).restart();
    return () => sim.stop();
  }
  const dataZoomIn = (node) => {
    onZoom(node.data.link);
  }

  const handleClick = (node) => {
    setVisibleNodes((prevNodes) => [node, ...node.children]);

    updateSim();
  }


  
  return (
   <>
  <svg
   ref={svgRef}
   width={"100vw"}
   height={"100vh"}
   viewBox="-500 -500 1000 1000"
 >
     {animatedNodes.map((node, i) => (
       <Node isVisible={visibleNodes.includes(node)} key={i} node={node} onClick={() => handleClick(node)}/>
     ))}
 </svg>
   </>
  );
}

export default Graph;
