/*global $:false */
'use strict';
console.log('------------- graph -------------');

// ---------- Dataset of the graph ---------- //
var dataGraph = {
  // Range of colors
  range: ['#005b7f', '#007dac', '#00a99d', '#6cc17b', '#a7003d', '#6f2c91', '#4b0049'],
  // Table with % of each activitie per user profile
  charts: {
    basic: [1, 45, 25, 20, 5, 4, 0, 0],
    medium: [2, 10, 15, 20, 5, 5, 35, 8],
    high: [2, 10, 10, 10, 5, 5, 48, 10]
  },
  // Message of the inner graphs
  message : {
    mail: 'mails equivalen a',
    web: 'minutos en la web equivalen a',
    social: 'posts en redes sociales equivalen a',
    music: 'minutos de streaming de música equivalen a',
    chat: 'minutos de video llamadas equivalen a',
    video: 'minutos de streaming de video equivalen a',
    games: 'minutos de juegos online equivalen a'
  }
}

console.log('dataGraph \n', dataGraph);

// renderBasic() => Init graph with value 0 GB
// renderBasic(profile, total, dataGraph) => Graph with total usage of the family, express in GB
// renderEachType(profile, total, type, dataGraph) => Graph for each type of consume

// Init valus for empty graph
// usage: 0,
// label: "GB de uso mensual",
// value: [100, 0, 0, 0, 0, 0, 0, 0],
// color: ['#ccc']

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
