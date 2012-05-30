//$(document).ready(function() {
function dobarchart()
{

//Data array
var data = [{"label":"1990", "value":16}, 
        {"label":"1991", "value":56}, 
        {"label":"1992", "value":7},
        {"label":"1993", "value":77},
        {"label":"1994", "value":22},
        {"label":"1995", "value":16},
        ];

//Maximum value we will plot to
var data_max = 80,

//Number of tickmarks to use
num_ticks = 5,

//Chart margins
left_margin = 60,
right_margin = 60,
top_margin = 10,
bottom_margin = 0;

//Set some default values like width and height
var w = 500,
    h = 500,
    color = function(id) { return '#00b3dc' };

//Setup scales for mapping our data to pixels
//The X scale will be linear for the width of the bars
var x = d3.scale.linear()
    //Input to this scale will be our data.
    .domain([0, data_max])
    //Output of this scale will be from 0 to the width of the graph
    .range([0, w - ( left_margin + right_margin ) ]),

    //The Y scale will be for the placement of the bars in regular intervals
    y = d3.scale.ordinal()
    //Input to this scale will be an index into the data array
    .domain(d3.range(data.length))
    //Output of this scale is a pixel valule. See docs for description of the padding parameter:
    //https://github.com/mbostock/d3/wiki/Ordinal-Scales#wiki-ordinal_rangeBands
    .rangeBands([bottom_margin, h - top_margin], .5);

//The top of our chart is actually at the bottom of the screen because of SVG's 0,0 origin being in the top left of the screen.
var chart_top = h - y.rangeBand()/2 - top_margin;
var chart_bottom = bottom_margin + y.rangeBand()/2;
var chart_left = left_margin;
var chart_right = w - right_margin;

//Setup the SVG element and position it.
var vis = d3.select("#svg")
    //.append("svg:svg")
        .attr("width", w)
        .attr("height", h)
    .append("svg:g")
        .attr("id", "barchart")
        .attr("class", "barchart")


//Create tick marks along the axes.
var rules = vis.selectAll("g.rule")
    //generate ticks using the x scale
    .data(x.ticks(num_ticks))
    //create a group element for each tick
.enter()
    .append("svg:g")
    //Move the ticks into position by translating each one the appropriate amount.
    .attr("transform", function(d)
            {
            return "translate(" + (chart_left + x(d)) + ")";});

//Draw a small line for the tick.
rules.append("svg:line")
    .attr("class", "tick")
    .attr("y1", chart_top)
    .attr("y2", chart_top + 4)
    .attr("stroke", "black");
//Label the tick with its value.
rules.append("svg:text")
    .attr("class", "tick_label")
    .attr("text-anchor", "middle")
    .attr("y", chart_top)
    .text(function(d)
    {
    return d;
    });
//Move the tick label down slightly by calculating how big it is.
var bbox = vis.selectAll(".tick_label").node().getBBox();
vis.selectAll(".tick_label")
.attr("transform", function(d)
        {
        //This translation accounts for changes in font size (through styling).
        return "translate(0," + (bbox.height) + ")";
        });



//Create the groups that will hold each bar
var bars = vis.selectAll("g.bar")
    .data(data)
//This creates one bar for each entry in our data array.
.enter()
    .append("svg:g")
        .attr("class", "bar")
        //We place each bar along the y axis using the ordinal scale defined above.
        .attr("transform", function(d, i) { 
                return "translate(0, " + y(i) + ")"; });

//Create the actual bars
bars.append("svg:rect")
    .attr("x", right_margin)
    //The width of each bar is determined by each data entry's value.
    .attr("width", function(d) {
            return (x(d.value));
            })
    //The height of each bar is determined by the rangeband.
    .attr("height", y.rangeBand())
    .attr("fill", color(0))
    .attr("stroke", color(0));


//Generate labels for each bar.
//The bars are selected and appended to according to their data.
var labels = vis.selectAll("g.bar")
    .append("svg:text")
        .attr("class", "label")
        .attr("x", 0)
        .attr("text-anchor", "right")
        .text(function(d) {
                return d.label;
                });

//Use the dimensions of the label to center it properly.
var bbox = labels.node().getBBox();
vis.selectAll(".label")
    .attr("transform", function(d) {
            return "translate(0, " + (y.rangeBand()/2 + bbox.height/4) + ")";
    });


//Create labels showing the value of each bar to  the right of it
labels = vis.selectAll("g.bar")
    .append("svg:text")
    .attr("class", "value")
    .attr("x", function(d)
            {
            return x(d.value) + right_margin + 10;
            })
    .attr("text-anchor", "left")
    .text(function(d)
    {
        return "" + d.value + "%";
    });

//Recenter the value labels.
bbox = labels.node().getBBox();
vis.selectAll(".value")
    .attr("transform", function(d)
    {
        return "translate(0, " + (y.rangeBand()/2 + bbox.height/4) + ")";
    });




//Draw axes along the top and bottom of the graph.
vis.append("svg:line")
    .attr("class", "axes")
    .attr("x1", chart_left)
    .attr("x2", chart_left)
    .attr("y1", chart_bottom)
    .attr("y2", chart_top)
    .attr("stroke", "black");
 vis.append("svg:line")
    .attr("class", "axes")
    .attr("x1", chart_left)
    .attr("x2", chart_right)
    .attr("y1", chart_top)
    .attr("y2", chart_top)
    .attr("stroke", "black");
    



//});
}
