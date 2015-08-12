/*global $:false */
'use strict';
console.log('------------- graph -------------');

// ---------- Dataset of a family  ---------- //
var baseGraph = {
  label: "GB de uso mensual",
  usage: 28,
  value: [2, 10, 15, 20, 5, 5, 35, 8],
  color: [2, 10, 15, 20, 5, 5, 35, 8]
};

var dataGraph = {
};

// ---------- Contruct the graph  ---------- //

var width = 300;
var height = 300;
var radius = Math.min(width, height) / 2;

var svg = d3.select("#svg").append("svg")
  .attr("width",  width)
  .attr("height", height);

function render(data){
  // Bind data
  var circles = svg.selectAll("circle").data(data);

  // Enter
  circles.enter().append("circle")
    .attr("r", 10);

  // Update
  circles
    .attr("cx", function (d){ return d.x; })
    .attr("cy", function (d){ return d.y; });

  // Exit
  circles.exit().remove();
}
var myArrayOfObjects = [
  { x: 100, y: 100},
  { x: 130, y: 120},
  { x: 80 , y: 180},
  { x: 180, y: 80 },
  { x: 180, y: 40 }
];

render(myArrayOfObjects);
