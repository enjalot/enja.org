

$(document).ready(function() {
    var scrollorama = $.scrollorama({
        blocks:'.section'
    });

    _.each(project_data, function(d, i) {
        d3.select("#" + d.id)
        .style("top", time_scale(d.end) + 200);

        var h = time_scale(d.start) - time_scale(d.end);

        /*
        //have the section start at the end date and pin at the top
        scrollorama.animate('#' + d.id ,{
        //scrollorama.animate('#micro',{
            duration: 100, 
            property:'opacity',
            //start: 0, 
            //end: 0,
            pin: true
        });
        */

    });


});

