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
  var svg = d3.select('#svg')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('svg:g')
    .attr('transform', 'translate(' + radius + ',' + radius + ')');

  // pie() function for arcs values
  var pie = d3.layout.pie().sort(null);

  // Helper function to calc arc's
  var arc = d3.svg.arc()
      .startAngle(function(d){ return d.startAngle; })
      .endAngle(function(d){ return d.endAngle; })
      .innerRadius(innerRadius)
      .outerRadius(radius);

  // select paths
  var arcs = svg.selectAll('path').data(pie(data))

  // enter() state of the graph
  arcs.enter()
    .append('path')
    .attr('opacity', 1)
    .attr('class', 'slice')
    .attr("fill", function(d, i) { return color(i); })
    .attr('d', function (d) {return arc(d);});

  // Exit
  arcs.exit().remove();

  // Create svg group for the inner text
  var text = svg.append('svg:g')
      .attr('class', 'text-group')
      .attr('transform', 'translate(0,20)');

  // Append a total text
  text.append('svg:text')
    .attr('class', 'text')
    .attr('fill', fontFill)
    .attr("text-anchor", "middle")
    .style('font-size', fontSize + 'px')
    .text(userSetting.totalUsage);

  // Append legend text
  text.append('svg:text')
    .attr('class', 'text')
    .attr('fill', fontFill)
    .attr("text-anchor", "middle")
    .attr('transform', 'translate(0,30)')
    .style('font-size', (fontSize/5) + 'px')
    .text('GB de uso mensual');

  console.log('asdf', arcs);

}

// render();
render(dataGraph.charts.medium);
