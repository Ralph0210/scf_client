import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./ExploreData2.css";
import { INITIAL_VALUE, ReactSVGPanZoom, TOOL_AUTO } from "react-svg-pan-zoom";
import data from "./var.json";
import DataInfoCard from "../DataInfoCard/DataInfoCard";
import useWindowSize from "../useWindowSize";
import { motion } from "framer-motion";

const ExploreData2 = ({ setSelectedInfoData, setShouldRenderDataInfoCard }) => {
  const size = useWindowSize();
  // const [data] = useState([25, 50, 35, 15, 94, 50]);
  const Viewer = useRef(null);
  const [tool, setTool] = useState(TOOL_AUTO);
  const [value, setValue] = useState(INITIAL_VALUE);
  const svgRef = useRef();
  const clickedNode = useRef();

  useEffect(() => {
    const handleNodeClick = (d, i) => {
      console.log(d, i);
      setShouldRenderDataInfoCard(true);
      setSelectedInfoData(i.data);
    };

    const old = d3.select(svgRef.current);
    old.selectAll("*").remove();

    const width = 950;
    const height = width;
    const cx = width * 0.5; // adjust as needed to fit
    const cy = height * 0.59; // adjust as needed to fit
    const radius = Math.min(width, height) / 2 - 30;
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
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      // .classed("svg-container", true)
      // .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", [-cx-150, -cy+50, width+300, height+100])
      // .classed("svg-content-responsive", true)
      .attr(
        "style",
        `width: ${width}px; height: ${height}px; font: 16px Helvetica Neue;`
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

        if (d.depth === 1 && d.data.name === "Financial Behavior") {
          return "fin-circle";
        }

        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Financial Behavior"
        ) {
          return "fin-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Labor Force") {
          return "labor-circle";
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Labor Force") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (
          d.depth === 3 &&
          d.parent &&
          d.parent.parent.data.name === "Labor Force"
        ) {
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
      .attr("class", (d) => {
        if (d.depth === 0) {
          return "root-circle pulse";
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

        if (d.depth === 1 && d.data.name === "Financial Behavior") {
          return "fin-circle";
        }

        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Financial Behavior"
        ) {
          return "fin-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Labor Force") {
          return "labor-circle";
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Labor Force") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (
          d.depth === 3 &&
          d.parent &&
          d.parent.parent.data.name === "Labor Force"
        ) {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        return "normal-circle"; // Default fill color for other nodes
      })
      .attr("r", (d) => {
        if (d.depth === 1 && d.data.name === "Demographics") {
          return 15;
        }
        // Set the default radius for other nodes
        return 0;
      })
      .style("opacity", 0.5)

    // Append labels.
    let labels = svg
      .append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll()
      .data(root.descendants())
      .join("text")
      .attr(
        "transform",
        (d) =>
          `rotate(${(d.x * 180) / Math.PI - 90})
          translate(${d.y},0)
          rotate(${-(d.x * 180) / Math.PI + 90})`
      )
      .attr("dy", "0.4em")
      .attr("x", (d) => (d.x < Math.PI === !d.children ? 10 : -10))
      .attr("text-anchor", (d) =>
        d.x < Math.PI === !d.children ? "start" : "end"
      )
      .attr("paint-order", "stroke")
      .attr("stroke", "white")
      .attr("fill", "currentColor")
      .text((d) => d.data.name)
      .style("opacity", 0); // Initially set text opacity to 0

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

        if (d.depth === 1 && d.data.name === "Financial Behavior") {
          return "fin-circle";
        }

        if (
          d.depth === 2 &&
          d.parent &&
          d.parent.data.name === "Financial Behavior"
        ) {
          return "fin-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Labor Force") {
          return "labor-circle";
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Labor Force") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (
          d.depth === 3 &&
          d.parent &&
          d.parent.parent.data.name === "Labor Force"
        ) {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        return "normal-circle"; // Default fill color for other nodes
      })
      .attr("r", 10);

    // Define mouseover and mouseout event handlers for nodes
    nodes
      .on("mouseover", function (d, i) {

        if (clickedNode.current !== i) {
          nodes
          .filter((data) => data.data === i.data)
          .transition()
          .duration(500)
          // .style('fill', '#0E518E')

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
        if (clickedNode.current !== i) {
          nodes
          .filter((data) => data.data === i.data)
          .transition()
          .duration(500)
          // .style('fill', '#779CBE')

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

          // Change the opacity of the associated text back to 0
          labels
            .filter((textData) => textData.data.name === i.data.name) // Filter for the matching text element
            .transition()
            .duration(800)
            .attr("x", (d) => (d.x < Math.PI === !d.children ? 10 : -10))
            .style("opacity", 0);
        }
        // Change the circle size back to its original size
      });

      svg.attr('transform', `translate(${-60}, ${-25})`);
  }, [size]);

  return (
    <div>
      <video src="/mapDemo.mov" width="100%" height="95%" style={{zIndex:999}}autoPlay loop muted></video>
    </div>
  );
};

export default ExploreData2;
