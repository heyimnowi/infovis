$( document ).ready(function() {

	var widthTopArtist = 960,
	    heightTopAritst = 700,
	    radius = Math.min(widthTopArtist, heightTopAritst) / 2;

	var x = d3.scale.linear()
	    .range([0, 2 * Math.PI]);

	var y = d3.scale.sqrt()
	    .range([0, radius]);

	var colorTopArtist = d3.scale.category20c();

	function format_description(d) {
	  return  '<b>' + d.name + '</b></br>'+ d.size;
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
        .duration(50)
        .style("opacity", 0.9);
    }

	var svg = d3.select("#container-2").append("svg")
	    .attr("width", widthTopArtist)
	    .attr("height", heightTopAritst)
	  .append("g")
	    .attr("transform", "translate(" + widthTopArtist / 2 + "," + (heightTopAritst / 2 + 10) + ")");

	var partition = d3.layout.partition()
	    .sort(null)
	    .value(function(d) { return 1; });

	var arc = d3.svg.arc()
	    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
	    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
	    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
	    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

	// Keep track of the node that is currently being displayed as the root.
	var node;

	d3.json("https://raw.githubusercontent.com/noeliablopez/infovis/gh-pages/data/topArtist.json", function(error, root) {
	  node = root;
	  var path = svg.datum(root).selectAll("path")
	      .data(partition.nodes)
	    	.enter().append("path")
	      .attr("d", arc)
	      .style("fill", function(d) { return colorTopArtist((d.children ? d : d.parent).name); })
	      .on("click", click)
	      .on("mouseover", mouseOverArc)
	      .each(stash);


	  d3.selectAll("input").on("change", function change() {
	    var value = this.value === "count"
	        ? function() { return 1; }
	        : function(d) { return d.size; };

	    path
	        .data(partition.value(value).nodes)
	      	.transition()
	        .duration(1000)
	        .attrTween("d", arcTweenData)
	        .on("mouseover", mouseOverArc);
	  });

	  function click(d) {
	    node = d;
	    path.transition()
	      .duration(1000)
	      .attrTween("d", arcTweenZoom(d));
	  }
	});

	d3.select(self.frameElement).style("height", heightTopAritst + "px");

	// Setup for switching data: stash the old values for transition.
	function stash(d) {
	  d.x0 = d.x;
	  d.dx0 = d.dx;
	}

	// When switching data: interpolate the arcs in data space.
	function arcTweenData(a, i) {
	  var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
	  function tween(t) {
	    var b = oi(t);
	    a.x0 = b.x;
	    a.dx0 = b.dx;
	    return arc(b);
	  }
	  if (i == 0) {
	   // If we are on the first arc, adjust the x domain to match the root node
	   // at the current zoom level. (We only need to do this once.)
	    var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
	    return function(t) {
	      x.domain(xd(t));
	      return tween(t);
	    };
	  } else {
	    return tween;
	  }
	}

	// When zooming: interpolate the scales.
	function arcTweenZoom(d) {
	  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
	      yd = d3.interpolate(y.domain(), [d.y, 1]),
	      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
	  return function(d, i) {
	    return i
	        ? function(t) { return arc(d); }
	        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
	  };
	}
});


