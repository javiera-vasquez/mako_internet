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
var width = 400;
var height = 400;
var innerRadius = 160;
var radius = Math.min(width, height) / 2;

var graph = [2, 10, 15, 20, 5, 5, 35, 8];
var color = d3.scale.ordinal().range(['#005b7f', '#007dac', '#00a99d', '#6cc17b', '#a7003d', '#6f2c91', '#4b0049']);

var vis = d3.select('#chart').append("svg")
  .data([graph])
  .attr("width", width)
  .attr("height", height)
  .append("svg:g")
  .attr("transform", "translate(" + radius + "," + radius + ")");

// Bind the data to the chart
var pie = d3.layout.pie().value(function(d){return d;});

// declare an arc generator function
var arc = d3.svg.arc()
    .startAngle(function(d){ return d.startAngle; })
    .endAngle(function(d){ return d.endAngle; })
    .innerRadius(innerRadius)
    .outerRadius(radius);

// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
  .data(pie)
  .enter()
  .append("svg:g")
  .attr("class", "slice");

arcs.append("svg:path")
  .attr("fill", function(d, i){
      // log the result of the arc generator to show how cool it is :)
      console.log(color(i));
      return color(i);
  })
  .attr("d", function (d) {
      // log the result of the arc generator to show how cool it is :)
      console.log(arc(d));
      return arc(d);
  });

// Create svg group for the inner text
var text = vis.append("svg:g").attr('class', 'text-group');

text.append("svg:text")                                     //add a label to each slice
    .attr("transform", function(d) {                    //set the label's origin to the center of the arc
      //we have to make sure to set these before calling arc.centroid
      d.innerRadius = 20;
      d.outerRadius = radius;
      return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
    })
    .attr('class', 'text')
    .attr("text-anchor", "center")                          //center the text on it's origin
    .text(function() { return userSetting.totalUsage; });

text.append("svg:text")                                     //add a label to each slice
    .attr("transform", function(d) {                    //set the label's origin to the center of the arc
      //we have to make sure to set these before calling arc.centroid
      d.innerRadius = 20;
      d.outerRadius = radius;
      return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
    })
    .attr('class', 'text')
    .attr("text-anchor", "center")                          //center the text on it's origin
    .text(function() { return userSetting.totalUsage; });





function render(data, type, kind){
  // Bind data
  var pie = d3.layout.pie();
  var circles = svg.selectAll("circle").data(data);

  // Enter
  circles.enter().append("pie").attr("r", 10);

  // Update
  circles
    .attr("cx", function (d){ return d.x; })
    .attr("cy", function (d){ return d.y; });

  // Exit
  circles.exit().remove();
}

// render();
