import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { zoom } from "d3-zoom";
import Node from "./Node";
import useQueryData from "../hooks/useQueryData";

function Graph() {
  const svgRef = useRef();

  //currently focused node
  const [origin, setOrigin] = useState(null);
  
  //raw content data
  const [data] = useQueryData(origin);

  //for d3 force simulation
  const [animatedNodes, setAnimatedNodes] = useState([]);

  //handle d3 zoom
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
    const sim = d3
      .forceSimulation()
      .force("charge", d3.forceManyBody().strength(100))
      .force("collide", d3.forceCollide(50));

    sim.on("tick", () => {
      setAnimatedNodes([...sim.nodes()]);
    });

    sim.nodes(data.children);
    sim.alpha(0.1).restart();
    return () => sim.stop();
  }, []);



  return (
    <>
      <svg
        ref={svgRef}
        width={"100vw"}
        height={"100vh"}
        viewBox="-500 -500 1000 1000"
      >
        {animatedNodes.map((node, i) => (
          <Node key={i} node={node} />
        ))}
      </svg>
    </>
  );
}

export default Graph;
