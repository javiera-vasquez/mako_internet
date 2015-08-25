/* global $:false, d3:false */
'use strict';
console.log('------------- graph -------------');

// ---------- Dataset of the graph ---------- //
var dataGraph = {
  // Range of colors
  range: ['#005b7f', '#007dac', '#00a99d', '#6cc17b', '#a7003d', '#6f2c91', '#4b0049'],
  // Table with % of each activitie per user profile
  charts: {
    basic: [1, 30, 38, 30, 1, 0],
    medium: [2,14, 17, 20, 2, 40, 5],
    high: [2, 8, 8, 11, 3, 60, 8]
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
};

console.log('dataGraph \n', dataGraph);

// renderBasic() => Init graph with value 0 GB
// renderBasic(profile, total, dataGraph) => Graph with total usage of the family, express in GB
// renderEachType(profile, total, type, dataGraph) => Graph for each type of consume

// Init valus for empty graph
// usage: 0,
// label: 'GB de uso mensual',
// value: [100, 0, 0, 0, 0, 0, 0, 0],
// color: ['#ccc']

// ---------- base vars  ---------- //
var width = 425;
var height = 425;
var radius = Math.min(width, height) / 2;
var innerRadius = radius - 30;
var fontSize = 100;
var fontFill = '#007b82';

// ---------- Render the graph  ---------- //
function render(dataset){
  // Init values for init value and reset
  var data = dataset || [100];
  var color = d3.scale.ordinal().range((dataset === undefined) ? ['#ccc'] : dataGraph.range);

  // Create the base svg and take data from dataGraph
  var vis = d3.select('#chart').append('svg')
    .data([data])
    .attr('width', width)
    .attr('height', height)
    .append('svg:g')
    .attr('transform', 'translate(' + radius + ',' + radius + ')');

  // Bind the data to the chart
  var pie = d3.layout.pie().sort(null).value(function(d){return d;});

  // declare an arc generator function
  var arc = d3.svg.arc()
      .startAngle(function(d){ return d.startAngle; })
      .endAngle(function(d){ return d.endAngle; })
      .innerRadius(innerRadius)
      .outerRadius(radius);

  // select paths, and enter()
  var arcs = vis.selectAll('g.slice')
    .data(pie)
    .enter()
    .append('svg:g')
    .attr('class', 'slice');

  // Update
  arcs.append('svg:path')
    .attr('fill', function(d, i){return color(i);})
    .attr('opacity', 1)
    .attr('d', function (d) {return arc(d);});

  // Create svg group for the inner text
  var text = vis.append('svg:g').attr('class', 'text-group');

  // translate(0,-100)
  text.append('svg:text')
    .attr('transform', 'translate(' + -(radius/4) + ',' + 20 + ')')
    .attr('class', 'text')
    .attr('fill', fontFill)
    .style('font-size', fontSize + 'px')
    .text(userSetting.totalUsage);

  text.append('svg:text')
    .attr('transform', 'translate(' + -(radius/2.8) + ',' + 50 + ')')
    .attr('class', 'text')
    .attr('fill', fontFill)
    .style('font-size', (fontSize/5) + 'px')
    .text('GB de uso mensual');

  // Exit
  arcs.exit().transition().duration(500).attr('x',1000).remove();
}


// function render(data, type, kind){
//   // Bind data
//   var pie = d3.layout.pie();
//   var circles = svg.selectAll('circle').data(data);

//   // Enter
//   circles.enter().append('pie').attr('r', 10);

//   // Update
//   circles
//     .attr('cx', function (d){ return d.x; })
//     .attr('cy', function (d){ return d.y; });

//   // Exit
//   circles.exit().remove();
// }

// render();
render(dataGraph.charts.medium);
