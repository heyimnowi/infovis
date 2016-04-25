$( document ).ready(function() {

  dataset = [
    {
      x: 100,
      y: 200,
      area: 50,
      color: '#FF639F'
    },
    {
      x: 300,
      y: 200,
      area: 100,
      color: '#FF2865'
    }
  ]


  var svgContainer = d3.select("#container").append("svg")
                                           .attr("width", 400)
                                           .attr("height", 400);

   svgContainer.selectAll('rect2')
                .data(dataset)
                .enter()
                .append('circle')
                .attr("fill", function(d) { return d.color})
                .attr("cy", function(d) { return d.y})
                .attr("cx", function(d) { return d.x })
                .attr("r", function(d) { return Math.sqrt(d.area) / Math.PI * 20})
                       
    
});


