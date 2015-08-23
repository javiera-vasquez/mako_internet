/*global $:false */
'use strict';
console.log('------------- graph -------------');

// ---------- Dataset of the graph ---------- //
var init = {
  usage: 0,
  label: "GB de uso mensual",
  value: [100, 0, 0, 0, 0, 0, 0, 0],
  color: ['#ccc']
};

var range = ['#005b7f', '#007dac', '#00a99d', '#6cc17b', '#a7003d', '#6f2c91', '#4b0049'];
var message = {

}

// render(init)
// render(userProfile, total, palette)

// renderDetail(type, userProfile, total, palette)

// ---------- Contruct the graph  ---------- //
var width = 300;
var height = 300;
var radius = Math.min(width, height) / 2;

var svg = d3.select('#svg').append('svg')
  .attr('width',  width)
  .attr('height', height);

function render(data, type, kind){
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
