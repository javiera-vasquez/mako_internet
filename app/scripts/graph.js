/* global $:false, d3:false */
'use strict';
console.log('------------- graph -------------');

// ---------- Dataset of the graph ---------- //
var dataGraph = {
  // Table with % of each activitie per user profile
  charts: {
    basic: [1, 30, 38, 30, 1, 0, 0],
    medium: [2,14, 17, 20, 2, 40, 5],
    high: [2, 8, 8, 11, 3, 60, 8]
  },
  // Message for each activities
  message: {
    mail: 'mails equivalen a',
    web: 'minutos en la web equivalen a',
    social: 'posts en redes sociales equivalen a',
    music: 'minutos de streaming de música equivalen a',
    chat: 'minutos de video llamadas equivalen a',
    video: 'minutos de streaming de video equivalen a',
    games: 'minutos de juegos online equivalen a'
  }
};

var kind = ['mail', 1]

console.log('dataGraph \n', dataGraph);

// update() => Init graph with value 0 GB
// update(profile, dataGraph) => Graph with total usage of the family, express in GB
// update(profile, type, dataGraph) => Graph for each type of consume

// ---------- base vars  ---------- //
var width = 425;
var height = 425;
var radius = Math.min(width, height) / 2;
var innerRadius = radius - 30;
var fontSize = 100;
var fontFill = '#007b82';
var colors = ['#005b7f', '#007dac', '#00a99d', '#6cc17b', '#a7003d', '#6f2c91', '#4b0049']

// Create the base svg and take data from dataGraph
var svg = d3.select('#svg')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('svg:g')
  .attr('transform', 'translate(' + radius + ',' + radius + ')');

// Create svg group for the inner text
var subGroup = svg.append('svg:g')
  .attr('class', 'text-group')
  .attr('transform', 'translate(' + 0 + ',' + -(height/4) + ')');

// ---------- Render and update the graph  ---------- //
function update(dataset, graph, type) {
  // Init values for colors and data
  if(dataset === undefined) {
    var data = [100, 0, 0, 100, 0, 0, 100];
    var color = d3.scale.ordinal().range(['#ccc']);
  } else {
    var data = graph.charts[dataset.profile];
    var color = d3.scale.ordinal().range(colors);
  }

  var dataNumber = (dataset === undefined) ? [7864, 3.9] : [dataset.totalUsage];
  var dataText = (dataset === undefined) ? [7864, 'minutos de video llamadas equivalen a', 3.9, 'de consumo'] : [dataset.totalUsage];
  console.log(dataText);

  // Setting pie value and sort
  var pie = d3.layout.pie().sort(null);

  // Helper function to calc arc's
  var arc = d3.svg.arc()
    // .startAngle(function(d){ return d.startAngle; })
    // .endAngle(function(d){ return d.endAngle; })
    .innerRadius(innerRadius)
    .outerRadius(radius);

  // DATA JOIN
  // Join new data with old elements, if any.
  var arcs = svg.selectAll('path').data(pie(data));
  var text = subGroup.selectAll('text').data(dataText);

  console.log(text);

  // UPDATE
  // Update old elements as needed.
  arcs
    .attr("fill", function(d, i) { return color(i);})
    .attr('opacity', function(d, i) {
      if(type !== undefined) {
        if(type[1] === i) {
          return 1;
        } else {return 0.5;}
      } else {return 1;}
    });

  // ENTER
  // Create new elements as needed.
  arcs.enter()
    .append('path')
    .attr("fill", function(d, i) { return color(i);})
    .attr("d", arc)
    .each(function(d) { this._current = d; }); // store the initial angles

  text.enter()
    .append('svg:text')
    .attr('class', 'text')
    .attr('fill', fontFill)
    .attr("text-anchor", "middle")
    .attr('y', function(d, i) {
      // console.log(d, i, dataText.length);
      return 80 + ((i % 2 === 0) ? i*i : i) * 30;
    })
    .style('font-size', function(d, i) {
      return ((i % 2 === 0) ? fontSize : fontSize/5) + 'px';
    });

  // ENTER + UPDATE
  // Appending to the enter selection expands the update selection to include
  // entering elements; so, operations on the update selection after appending to
  // the enter selection will apply to both entering and updating nodes.
  // arcs.attr('d', function(d) {return arc(d);});
  arcs
    .transition()
    .duration(750)
    .attrTween("d", arcTween); // redraw the arcs

  text
    .transition()
    .duration(500)
    .tween("text", textTween);


  // Function for calc the transition of text
  function textTween(a) {
    var i = d3.interpolate(this.textContent, a);
    var prec = (a + "").split(".");
    var round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;
    return function(t) {
        this.textContent = Math.round(i(t) * round) / round;
    };
  }

  // Function for calc the transition of the arc
  function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arc(i(t));
    };
  }

  // EXIT
  // Remove old elements as needed.
  arcs.exit().remove();
  text.exit().remove();
}

update();
// update(userSetting, dataGraph);
