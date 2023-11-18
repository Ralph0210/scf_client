import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import * as d3 from "d3";
import "./ExploreData.css";
import {
  INITIAL_VALUE,
  ReactSVGPanZoom,
  TOOL_AUTO,
  TOOL_NONE,
} from "react-svg-pan-zoom";
// import data from './flare-2.json'
// import data from "./var.json";
// import data from './var3.json'
import data from "../../newVar.json";
// import data from './var2.json'
import DataInfoCard from "../DataInfoCard/DataInfoCard";
// import useWindowSize from "../useWindowSize";
import styles from "./ExploreData.module.css";
import { useWindowSize } from "@react-hook/window-size";

const ExploreData = ({
  setSelectedInfoData,
  setShouldRenderDataInfoCard,
  distinctVariables,
}) => {

  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });

  const handleOnClick = (event) => {
    // Get the coordinates of the click relative to the document
    const { clientX, clientY } = event;

    // Update state with the new coordinates
    setClickCoordinates({ x: clientX, y: clientY });
  };

  // const [data] = useState([25, 50, 35, 15, 94, 50]);
  const Viewer = useRef(null);
  const divRef = useRef()
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(1000);
  const [tool, setTool] = useState(TOOL_AUTO);
  const [value, setValue] = useState(INITIAL_VALUE);
  // const [width, height] = useWindowSize({
  //   initialWidth: 400,
  //   initialHeight: 400,
  // });

  // useLayoutEffect(() => {
  //   Viewer.current.fitToViewer();
  // }, []);

  const updateDimensions = () => {
    const newWidth = divRef.current.offsetWidth;
    const newHeight = divRef.current.offsetHeight;
    setWidth(newWidth);
    setHeight(newHeight);
  };

  useEffect(() => {
    // Initial dimensions
    updateDimensions();

    // Add event listener for window resize
    window.addEventListener('resize', updateDimensions);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const svgRef = useRef();
  const svgRef2 = useRef();
  const clickedNode = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    const handleNodeClick = (d, i) => {
      if (i) {
        setShouldRenderDataInfoCard(true);
      setSelectedInfoData(i.data);
      }
    };

    const old = d3.select(svgRef2.current);
    old.selectAll("*").remove();

    const cx = width * 0.5; // adjust as needed to fit
    const cy = height * 0.59; // adjust as needed to fit
    const radius = Math.min(width, height) / 2 + 150;
    // Create a radial tree layout. The layout’s first dimension (x)
    // is the angle, while the second (y) is the radius.
    const tree = d3
      .tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    // Sort the tree and apply the layout.
    const root = tree(
      d3.hierarchy(data).sort((a, b) => d3.ascending(a.data.name, b.data.name))
    );

    // Creates the SVG container.
    const svg = d3
      .select(svgRef2.current)
      .attr("width", width)
      .attr("height", width)
      // .classed("svg-container", true)
      // .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", [-cx, -cy, width, width])
      // .classed("svg-content-responsive", true)
      .attr(
        "style",
        `width: ${width}px; height: ${width}px; font: 10px sans-serif;`
      )
      .attr("class", "mapsvg");

    // Append links.
    let links = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(root.links())
      .join("path")
      .attr(
        "d",
        d3
          .linkRadial()
          .angle((d) => d.x)
          .radius((d) => d.y)
      );

    let nodeAnimation2 = svg
      .append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr("class", (d) => {
        if (d.depth === 0) {
          return "root-circle";
        }
        // Check if the node is at depth 1 and has the name "Demographics"
        if (d.depth === 1 && d.data.name === "Demographics") {
          return "demo-circle"; // Apply a different fill color to the "Demographics" branch
        }

        // Check if the node is at depth 2 under "Demographics"
        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Demographics"
        ) {
          return "demo-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        // Check if the node is at depth 2 under "Demographics"
        // if (d.depth === 3 && d.parent && d.parent.parent.data.name === "Demographics") {
        //   return "demo-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        // }

        if (d.depth === 1 && d.data.name === "Financial Assets") {
          return "fin-circle";
        }

        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Financial Assets"
        ) {
          return "fin-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }
        if (d.depth === 1 && d.data.name === "Income and Earnings") {
          return "In-circle";
        }

        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Income and Earnings"
        ) {
          return "In-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Nonfinancial Assets") {
          return "non-circle";
        }

        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Nonfinancial Assets"
        ) {
          return "non-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Debt") {
          return "labor-circle";
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Debt") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 3 && d.parent && d.parent.parent.data.name === "Debt") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        return "normal-circle"; // Default fill color for other nodes
      })
      .attr("r", 0);

    let nodeAnimation = svg
      .append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr("class", (d) => {
        if (d.depth === 0) {
          return "root-circle";
        }
        // Check if the node is at depth 1 and has the name "Demographics"
        if (d.depth === 1 && d.data.name === "Demographics") {
          return "demo-circle"; // Apply a different fill color to the "Demographics" branch
        }

        // Check if the node is at depth 2 under "Demographics"
        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Demographics"
        ) {
          return "demo-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        // Check if the node is at depth 2 under "Demographics"
        if (
          d.depth === 3 &&
          d.parent &&
          d.parent.parent.data.name === "Demographics"
        ) {
          return "demo-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Financial Assets") {
          return "fin-circle";
        }

        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Financial Assets"
        ) {
          return "fin-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }
        if (d.depth === 1 && d.data.name === "Income and Earnings") {
          return "In-circle";
        }

        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Income and Earnings"
        ) {
          return "In-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }
        if (d.depth === 1 && d.data.name === "Nonfinancial Assets") {
          return "non-circle";
        }

        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Nonfinancial Assets"
        ) {
          return "non-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Debt") {
          return "labor-circle";
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Debt") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 3 && d.parent && d.parent.parent.data.name === "Debt") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        return "normal-circle"; // Default fill color for other nodes
      })
      .attr("r", 0);

    let highLightNode = svg
      .append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr("class", (d) => {
        // if (d.depth === 0) {
        //   return "root-circle"
        // }
        const isNodeInDistinctVariables = distinctVariables.has(d.data.value);
        // console.log(isNodeInDistinctVariables, "isNode")

        if (isNodeInDistinctVariables) {
          return "red-circle"; // Apply a red fill color to nodes in distinctVariables
        }
      })
      .attr("r", 15)
      .attr("fill", "none");

    // Append nodes.
    let nodes = svg
      .append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr("class", (d) => {
        if (d.depth === 0) {
          return "root-circle";
        }

        // Check if the node is at depth 1 and has the name "Demographics"
        if (d.depth === 1 && d.data.name === "Demographics") {
          return "demo-circle"; // Apply a different fill color to the "Demographics" branch
        }

        // Check if the node is at depth 2 under "Demographics"
        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Demographics"
        ) {
          return "demo-circle";
        }

        // Check if the node is at depth 2 under "Demographics"
        if (
          d.depth === 3 &&
          d.parent &&
          d.parent.parent.data.name === "Demographics"
        ) {
          return "demo-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Financial Assets") {
          return "fin-circle";
        }

        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Financial Assets"
        ) {
          return "fin-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Income and Earnings") {
          return "In-circle";
        }

        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Income and Earnings"
        ) {
          return "In-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Nonfinancial Assets") {
          return "non-circle";
        }

        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Nonfinancial Assets"
        ) {
          return "non-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Debt") {
          return "labor-circle";
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Debt") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 3 && d.parent && d.parent.parent.data.name === "Debt") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        return "normal-circle"; // Default fill color for other nodes
      })
      .attr("r", 10);

    // Append labels.
    let labels = svg
      .append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll()
      .data(root.descendants())
      .join("text")
      // .attr(
      //   "transform",
      //   (d) =>
      //     `rotate(${(d.x * 180) / Math.PI - 90})
      //   translate(${d.y},0)
      //   rotate(${-(d.x * 180) / Math.PI + 90})`
      // )
      .attr(
        "transform",
        (d) => {
          const isSpecialLabel =
            d.data.name === "Value of Primary Residence" ||
            d.data.name === "Credit Card Balance"||
            d.data.name === "Prepaid Card" ||
            d.data.name === "Retirement Accounts";
          const offset = isSpecialLabel ? 10 : 0;
          return `
            rotate(${(d.x * 180) / Math.PI - 90})
            translate(${d.y + offset}, 0)
            rotate(${-(d.x * 180) / Math.PI + 90})`;
        }
      )
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.x < Math.PI === !d.children ? 10 : -10))
      .attr("text-anchor", (d) =>
        d.x < Math.PI === !d.children ? "start" : "end"
      )
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("fill", "currentColor")

      .text((d) => d.data.name)
      .style("opacity", (d) => (d.depth === 0 ? 1 : 0));

    // nodes.on("click", function (d, i) {

    //   if (d.depth === 1) {
    //     // If the clicked node has depth 1, update the selected node
    //     setSelectedNode(selectedNode === i ? null : i);
    //     console.log(selectedNode)
    //   } else {
    //     // If the clicked node has depth other than 1, reset the selected node
    //     setSelectedNode(null);
    //   }
    //   if(selectedNode){
    //     const myLabelSelection = d3.selectAll(".node").filter(d => d.data.name === selectedNode.data.name);
    // const descendants = myLabelSelection.datum().descendants();
    // descendants.attr('opacity', 0)
    //   }

    // })

    let accDx = 0
    let accDy = 0

    let dx = 0
    let dy = 0

    // Define mouseover and mouseout event handlers for nodes
    nodes
      .on("click", function (d, i) {

        const past = clickedNode.current;
        clickedNode.current = i;

        const mouseX = d.x
        const moustY = d.y

        const centerX = width-radius+150;
        const centerY = cy - 50;

        accDx += dx
        accDy += dy

        dx = centerX - mouseX
        dy = centerY - moustY

        console.log(d, "mouseX:", mouseX, "mouseY:", moustY, "dx:", dx, "dy:", dy,`translate(${centerX +accDx + dx}, ${centerY + accDy + dy})`, centerX, centerY, accDx, accDy)

        

        svg
          .transition()
          .duration(800)
          .attr('transform', `translate(${centerX +accDx + dx}, ${centerY + accDy + dy})`);

        nodeAnimation
          .filter((data) => data.data === i.data) // Filter for the matching data point
          .transition()
          .duration(500)
          .attr("r", 15)
          .style("opacity", 0.5);

        nodeAnimation2
          .filter((data) => data.data === i.data) // Filter for the matching data point
          .transition()
          .duration(600)
          .attr("r", 20)
          .style("opacity", 0.3);

        // Change the opacity of the associated text to 1
        labels
          .filter((textData) => textData.data.name === i.data.name) // Filter for the matching text element
          .transition()
          .duration(800)
          .attr("x", (d) => (d.x < Math.PI === !d.children ? 20 : -20))
          .style("opacity", 1);

        const childrenLabels = labels
          .filter((textData) => textData.parent === i)
          .transition()
          .duration(800)
          .style("opacity", 1);

        if (past && past !== clickedNode.current) {
          nodeAnimation
            .filter((data) => data.data === past.data) // Filter for the matching data point
            .transition()
            .duration(600)
            .attr("r", 0)
            .style("opacity", 0.5);

          nodeAnimation2
            .filter((data) => data.data === past.data) // Filter for the matching data point
            .transition()
            .duration(600)
            .attr("r", 0)
            .style("opacity", 0.5);

          // Change the opacity of the associated text back to 0

          labels
            .filter(
              (textData) =>
                textData.parent !== clickedNode.current && // Nodes that are not the parent of the clicked node
                textData.data.name !== clickedNode.current.data.name // Exclude the clicked node itself
              // textData.data.name === past.data.name // Include the past clicked node
            )
            .transition()
            .duration(800)
            .attr("x", (d) => (d.x < Math.PI === !d.children ? 10 : -10))
            .style("opacity", 0);
        }
      })

      .on("mouseover", function (d, i) {
        // console.log("Mouseover Event - Data:", d, "Index:", i, "description:", i.data.description);
        // Change the circle size

        if (clickedNode.current !== i) {
            handleNodeClick(d, i);
          
          nodeAnimation
            .filter((data) => data.data === i.data) // Filter for the matching data point
            .transition()
            .duration(500)
            .attr("r", 15)
            .style("opacity", 0.5);

          nodeAnimation2
            .filter((data) => data.data === i.data) // Filter for the matching data point
            .transition()
            .duration(600)
            .attr("r", 20)
            .style("opacity", 0.3);

          // Change the opacity of the associated text to 1
          labels
            .filter((textData) => textData.data.name === i.data.name) // Filter for the matching text element
            .transition()
            .duration(800)
            .attr("x", (d) => (d.x < Math.PI === !d.children ? 20 : -20))
            .style("opacity", 1);
        }
        
      })
      .on("mouseout", function (d, i) {
        handleNodeClick(d, clickedNode.current);
        const isImmediateChild =
          clickedNode &&
          clickedNode.current &&
          i.parent &&
          i.parent.data &&
          i.parent.data.name === clickedNode.current.data.name;
        // console.log(isImmediateChild, "is or not is");
        if (clickedNode.current !== i) {
          
          nodeAnimation
            .filter((data) => data.data === i.data) // Filter for the matching data point
            .transition()
            .duration(600)
            .attr("r", 0)
            .style("opacity", 0.5);

          nodeAnimation2
            .filter((data) => data.data === i.data) // Filter for the matching data point
            .transition()
            .duration(600)
            .attr("r", 0)
            .style("opacity", 0.5);

          labels
            .filter((textData) => textData.data.name === i.data.name) // Filter for the matching text element
            .transition()
            .duration(800)
            .attr("x", (d) => (d.x < Math.PI === !d.children ? 10 : -10));

          if (clickedNode.current !== i && !isImmediateChild) {
            
            // Change the opacity of the associated text back to 0
            labels
              .filter((textData) => textData.data.name === i.data.name) // Filter for the matching text element
              .transition()
              .duration(800)
              .attr("x", (d) => (d.x < Math.PI === !d.children ? 10 : -10))
              .style("opacity", 0);
          }
        }
        // Change the circle size back to its original size
      });

    svg.attr("transform", `translate(${width-radius+150}, ${cy - 50})`);
  }, [width, height, selectedNode]);

  return (
    <>
      <div className="pan_container" ref={divRef} onClick={handleOnClick}>
        
        <ReactSVGPanZoom
          ref={Viewer}
          background="rgba(217, 217, 217, 0.20)"
          defaultTool="pan"
          width={width}
          height={height}
          tool={tool}
          onChangeTool={setTool}
          value={value}
          onChangeValue={setValue}
          detectAutoPan={false}
          toolbarProps={{
            position: "none", // Set position to "none" to hide the toolbar
          }}
          miniatureProps={{
            position: "none", // Set position to "none" to hide the miniature
          }}
          // className="map_parent_container"
        >
          <svg>
            <g ref={svgRef2}></g>
          </svg>
        </ReactSVGPanZoom>
      </div>
    </>
  );
};

export default ExploreData;
