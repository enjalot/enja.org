
var project_data = [
    {"id": "micro", "start": 2001, "end": 2003, "type": "v"},
    {"id": "gis", "start": 2003, "end": 2008, "type": "v"},
    {"id": "hci", "start": 2007, "end": 2009, "type": "h"},
    {"id": "chinese", "start": 2005, "end": 2009, "type": "c"},
    {"id": "dsc", "start": 2009, "end": 2011, "type": "v"},
    {"id": "visually", "start": 2011, "end": 2012, "type": "v"},
];
/*
    {"id": "tributary", "start": 2012, "end": 2012, "current": true},
    {"id": "d3", "start": 2012, "end": 2012, "current": true},
    {"id": "freelance", "start": 2012, "end": 2012, "current": true}
]
*/

var timeline_height = 4000;
var time_scale = d3.scale.linear()
    .domain([2001, 2012])
    .range([timeline_height, 0]);

var div = d3.select("#timeline");

var make_timeline = function() {
    var bars = div.selectAll("div.time_bar")
        .data(project_data)
        .enter()
        .append("div")
        .classed("time_bar", true)
        .style("position", "absolute")
        ;

    bars.style("width", 20)
        .style("height", function(d,i) {
            return time_scale(d.start) - time_scale(d.end);
        })
        .style("top", function(d,i) {
            return time_scale(d.end);
        })
        .style("margin-left", function(d,i) {
            return i * 20;
        })
        .style("background-color", function(d,i) {
            //colors is defined in workfocus.js
            return color(d.type);
        });

}

make_timeline();
