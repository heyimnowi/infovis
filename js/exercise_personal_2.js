$( document ).ready(function() {

	var width = 350,
	    height = 400,
	    radius = (Math.min(width, height) / 2) - 10;

	var formatNumber = d3.format(",d");

	var x = d3.scale.linear()
	    .range([0, 2 * Math.PI]);

	var y = d3.scale.sqrt()
	    .range([0, radius]);

	var partition = d3.layout.partition()
	    .value(function(d) { return d.size; });

	var arc = d3.svg.arc()
	    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
	    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
	    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
	    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

	function format_description(d) {
		console.log(d);
	  return '<div class="circle-reference" style="background-color:' + d.color + '"></div>' +
                    '<span class="title">' + d.name + 
                    '</span><span class="data">' + d.size + '</span>'; 
	}

	var tooltip = d3.select("#container-2")
    .append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("opacity", 0);

	function mouseOverArc(d) {	 
    tooltip.html(format_description(d));
      return tooltip.transition()
	    .style("left", (d3.event.pageX+12) + "px")
	    .style("top", (d3.event.pageY-10) + "px")
			.style("display", "block")
      .duration(50)
      .style("opacity", 0.9);
    }

	 function mouseOut(d) {
		tooltip.html("");
		tooltip.style("display", "none");
		return tooltip;
	 }

	var svg = d3.select("#container-2").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  	.append("g")
	    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

	d3.json("https://raw.githubusercontent.com/noeliablopez/infovis/gh-pages/data/topArtist.json", function(error, root) {
	  if (error) throw error;

	  svg.selectAll("path")
	      .data(partition.nodes(root))
	    	.enter().append("path")
	      .attr("d", arc)
	      .style("fill", function(d) { return d.color; })
	      .on("click", click)
	      .on("mouseover", mouseOverArc)
	      .on("mouseout", mouseOut);
	});

	function click(d) {
	  svg.transition()
	      .duration(750)
	      .tween("scale", function() {
	        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
	            yd = d3.interpolate(y.domain(), [d.y, 1]),
	            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
	        return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
	      })
	    .selectAll("path")
	      .attrTween("d", function(d) { return function() { return arc(d); }; });
	}

	d3.select(self.frameElement).style("height", height + "px");
});


