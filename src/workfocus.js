

var project_data = [
    {"id": "micro", "start": 2001, "end": 2003},
    {"id": "gis", "start": 2003, "end": 2008},
    {"id": "hci", "start": 2007, "end": 2008},
    {"id": "chinese", "start": 2005, "end": 2009},
]
var focus_data = [
    {"v": 10, "g": 60, "c": 0, "m": 30},
    {"v": 60, "g": 20, "c": 0, "m": 20},
    {"v": 30, "g": 10, "c": 40, "m": 20}
];

//try inverted ordinal scale?
var domain = [0, 500, 1000];
var time_scale = d3.scale.linear()
    .domain(domain)
    .range(focus_data);

var color = d3.scale.category20();

//the div we will work within
var div = d3.select("#workfocus");
var dw = parseInt(div.style("width"), 10)+20;
var dh = parseInt(div.style("height"), 10);

//TODO: reimplement this as a chart class (like pie layout)
var layout = function(d) {
    //turn the current data into a sideways stacked bar
    var i = 0;
    var datas = [];
    var key;
    for(key in d) {
        if(d.hasOwnProperty(key)) {
            var value = d[key];
            //assume our data adds up to 100 (we could normalize this of course)
            var w = dw * value/100; //give us the bar's width
            var x = 0;
            if(i >= 1) {
                //make our current x from the last several
                x = datas[i-1].x + datas[i-1].width;
            }
            datas.push({"key": key, "value": value, "x": x, "width":w});
            i++;
        }
    }
    return datas;
};

var init = function() {
    var datum = focus_data[0];
    div.selectAll("div.bar")
        .data(layout(datum))
        .enter()
        .append("div")
        .classed("bar", true);

}; 

var update = function(t) {
    //interpolate between the data points

    var old_datum = focus_data[0];
    var new_datum = focus_data[1];
    var datum = d3.interpolate(old_datum, new_datum)(t);
    
    div.selectAll("div.bar")
        .data(layout(datum))
        .style("width", function(d,i) {
            return d.width;
        })
        .style("left", function(d,i) {
            return d.x;
        })
        .style("background-color", function(d,i) {
            return color(d.key);
        })
        .style("height", dh);


};



init();
update(0);




