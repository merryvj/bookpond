import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { zoom } from "d3-zoom";
import Node from "./Node";

function Graph({ data, onZoom}) {
  const svgRef = useRef();
  
  const [root, setRoot] = useState(null);
  const [animatedNodes, setAnimatedNodes] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [focusedNode, setFocusedNode] = useState();

  let newData = [
    {
      type: "Subject",
      content: "UWU"
    },
    {
      type: "Subject",
      content: "OOWOO"
    },
    {
      type: "Author",
      content: "OOWOO"
    },
    {
      type: "Book",
      content: "OOWOO"
    },
  ]

  const addChildrenNodes = () => {
    const sim = d3
      .forceSimulation()
      .force("radial", d3.forceRadial(150, 0, 0))
      .force("collide", d3.forceCollide(150));

    sim.on("tick", () => {
      setAnimatedNodes([...sim.nodes()]);
    });

    sim.nodes(newData);
    sim.alpha(0.1).restart();
  }

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const zoomBehavior = zoom()
      .scaleExtent([0.5, 5]) // Set the minimum and maximum zoom level
      .on("zoom", handleZoom);

    svg.call(zoomBehavior);
    
    function handleZoom(e) {

      //find node being zoomed into
      let scale = -e.transform.k;
      setFocusedNode(sim.find(e.transform.x/scale, e.transform.y / scale, 150));

      if (e.transform.k === 5 && zoomLevel === 0) {
        setZoomLevel(1);
        addChildrenNodes();
      } else if (e.transform.k < 1) {
        setZoomLevel(0);
      }

      // Get the zoom transform
      const transform = e.transform;

      // Apply the zoom transform to the elements you want to zoom
      svg.selectAll("g").attr("transform", transform);
    }

    const sim = d3
      .forceSimulation()
      .force("radial", d3.forceRadial(150, origin.x, origin.y))
      .force("collide", d3.forceCollide(150));

    sim.on("tick", () => {
      setAnimatedNodes([...sim.nodes()]);
    });

    sim.nodes(data);
    sim.alpha(0.1).restart();
    return () => sim.stop();
  }, [zoomLevel]);


  const dataZoomIn = (node) => {
    onZoom(node.data.link);
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
          <Node key={i} node={node} onClick={() => dataZoomIn(node)}/>
        ))}
    </svg>
   </>
  );
}

export default Graph;
