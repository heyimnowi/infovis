$( document ).ready(function() {

  var svgContainer = d3.select("#container-3").append("svg")
                                           .attr("width", 370)
                                           .attr("height", 200);

  d3.json("https://raw.githubusercontent.com/noeliablopez/infovis/gh-pages/data/topAlbums.json", function(data) {

  	console.log(data);

    svgContainer.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .text(function(d) { return d.name; })
                .style("font-size", "10px")
                .style("display", "inline-block")
                .style("line-height", "20px")
                .style("max-width", "100px")
                .attr("y", function(d,i) { return 18+i*25});

    svgContainer.selectAll('text2')
                .data(data)
                .enter()
                .append('text')
                .text(function(d) { return d.size; })
                .style("font-size", "14px")
                .attr("x", "280")
                .style("display", "inline-block")
                .style("line-height", "20px")
                .attr("y", function(d,i) { return 18+i*25});

    svgContainer.selectAll('rect1')
                .data(data)
                .enter()
                .append('rect')
                .attr("fill", "#1ED760")
                .attr("y", function(d,i) { return i*25 + 4})
                .attr("x", "310")
                .style("height", "20px")
                .style("display", "inline-block")
                .style("width", function(d) { return d.size + 'px'});
  });
});


