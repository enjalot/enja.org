


//goes from 2001 to 2012
var focus_data = [
    {"v": 90, "c": 0, "h": 10}, //2001
    {"v": 90, "c": 0, "h": 10}, //2002
    {"v": 90, "c": 0, "h": 10}, //2003
    {"v": 90, "c": 0, "h": 10}, //2004
    {"v": 90, "c": 0, "h": 10}, //2005
    {"v": 90, "c": 0, "h": 10}, //2006
    {"v": 90, "c": 0, "h": 10}, //2007
    {"v": 90, "c": 0, "h": 10}, //2008
    {"v": 90, "c": 0, "h": 10}, //2009
    {"v": 90, "c": 0, "h": 10}, //2010
    {"v": 90, "c": 0, "h": 10}, //2011
    {"v": 90, "c": 0, "h": 10}  //2012
];

//try inverted ordinal scale?
var domain = [0, 500, 1000];
var time_scale = d3.scale.linear()
    .domain(domain)
    .range(focus_data);

//var color = d3.scale.category20();
var colors = [
    "#5683C7",
    "#C75683",
    "#83C756"
];
var color_map = {
    "v": 0,
    "c": 1,
    "h": 2
}
var cl = colors.length;
var color = function(d) {
    return colors[color_map[d]%cl];
};

//the div we will work within
var div = d3.select("#workfocus");
var dw = parseInt(div.style("width"), 10)+20;
var dh = parseInt(div.style("height"), 10);



//TODO: reimplement this as a chart class (like pie layout)
var layout = function(d) {
    dw = parseInt(div.style("width"), 10)+20;
    dh = parseInt(div.style("height"), 10);

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
        .data(layout(datum), function(d) { return d.key; })
        .enter()
        .append("div")
        .classed("bar", true);

}; 

var update = function(t) {

    //interpolate between the data points
    var old_datum = focus_data[0];
    var new_datum = focus_data[1];
    var datum = d3.interpolate(old_datum, new_datum)(t);
    
    div = d3.select("#workfocus");
    var brs = div.selectAll("div.bar")
        .data(layout(datum), function(d) { return d.key; })

    brs
        .style("width", function(d,i) {
            return d.width;
        })
        .style("left", function(d,i) {
            return d.x;
        })
        .style("background-color", function(d,i) {
            return color(d.key);
            //return color(i);
        })
        .style("height", dh)
        .attr("rx", 5)
        .attr("ry", 5)
        ;


};



init();
update(0);

$(window).resize(function() {
    update(0);
});



