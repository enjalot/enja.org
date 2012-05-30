  var w = 500;
    var h = 500;

    var r1 = 90;
    var r2 = 150;
    var r3 = 220;
    var r4 = 280;
    var r5 = 340;
    var r6 = 410;

    
    var size = 20

    var click = function()
    {
        running = !running
        if(running)
            setTimeout(update_circles, 80);

    }

    //setup svg canvas
    svg = d3.select("#svg")
            .attr("width", w)
            .attr("height", h)
            //.attr("transform", "scale(.5 .5)")
            .attr("id", "spiral")
            .on("click", click)
    svg.append("svg:rect")
        .attr("class", "background_rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("fill", "#888")

    chart = svg.append("svg:g")
        .attr("class", "base_group")
        .attr("transform", "translate(" + [w/2,h/2] + ")scale(.5 .5)");

    var make_circle = function(r,n,offset, step)
    {
        data = []
        for(i = 0; i < n; i++)
        {
            theta = offset + i * 2 * Math.PI / n
            sz = Math.abs(size/4 * Math.sin(i*Math.PI)) + size
            //sz = Math.abs(size/2 * Math.sin(theta)) + size
            data.push({x: r * Math.cos(theta), y: r * Math.sin(theta), angle: theta, index: i, size: sz })
        }
        return data
    }

    var circle_factory = function(name, data, offset)
    {

        var boxes = chart.selectAll("g." + name)
            .data(data, function(d) { return d.index })

        boxes.enter().append("svg:g")
            .attr("class", name)
        .append("svg:rect")
        /*
            .attr("width", function(d,i) { return d.size})
            .attr("height", function(d,i) { return d.size})
            .attr("stroke", function(d,i){
                if(d.index % 2 == 1) {
                   return "#fff"
                }
                return "#000"
            })
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr("transform", function(d,i) {
                a = offset + step * d.index;
                return "translate(" + [d.x ,d.y] + ")rotate(" + [a, d.size/2, d.size/2] + ")"
            })
            */

        boxes.selectAll("rect")
            .data(data, function(d) { return d.index })
            .attr("width", function(d,i) { return d.size})
            .attr("height", function(d,i) { return d.size})
            .attr("stroke", function(d,i){
                if(d.index % 2 == 1) {
                   return "#fff"
                }
                return "#000"
            })
            .attr("stroke-width", 3)
            .attr("fill", "none")
            .attr("transform", function(d,i) {
                a = offset + step * d.index;
                //console.log("a,d",a,d);
                return "translate(" + [d.x ,d.y] + ")rotate(" + [a, d.size/2, d.size/2] + ")"
            })

    }

    rot = 0

    var update_circles = function() {
        rot += Math.PI / 24
        //console.log(rot)
        n = 18
        data1 = make_circle(r1, n, rot)
        step = 20 
        offset = 15;
        circle_factory("one", data1, offset, step)
        //console.log(data)

        n = 30 
        data2 = make_circle(r2, n, rot)
        step = 12
        offset = -15
        circle_factory("two", data2, offset, step)

        n = 44
        data3 = make_circle(r3, n, rot)
        step = 8 
        offset = 15;
        circle_factory("three", data3, offset, step)

        n = 60 
        data4 = make_circle(r4, n, rot)
        step =  6
        offset = -15;
        circle_factory("four", data4, offset, step)

        n = 80 
        data5 = make_circle(r5, n, rot)
        step =  4
        offset = 15;
        circle_factory("five", data5, offset, step)

        n = 90 
        data6 = make_circle(r6, n, rot)
        step =  4
        offset = -15;
        circle_factory("six", data6, offset, step)

        if(running)
            setTimeout(update_circles, 100);
    }


    running = true
    update_circles();

