$( document ).ready(function() {

	var topTracksArray = [];
	var width = 300;
	var height = 300;
	var a = width / 2;
	var b = height / 2;

	var scale = d3.scale.linear()
                  .domain([1, 25])
                  .range([1, 300]);

  // No funciona d3.max
  // console.log(d3.max(topTracksArray, function(d) { return d.playcount; }));

	var color = d3.scale.quantile()
	              .domain([0, 5, 10, 15, 20, 25])
	              .range(["#CBFFCE", "#90E0AB", "#0FC1A1", "#106EE8", "#07588A", "#0C056D"]);

	radius = Math.min(width-100,height-100)/2;

	var arc = d3.svg.arc()  
							.outerRadius(radius -230)
							.innerRadius(radius - 50)
							.cornerRadius(20);

	var arcOver = d3.svg.arc()  
									.outerRadius(radius +50)
									.innerRadius(0);

	var svg = d3.select("#container").append("svg")
							.attr("viewBox", "0 0 " + width + " " + height / 2)
							.append("g")
							.attr("transform","translate(150,75)");

	div = d3.select("body")
					.append("div") 
					.attr("class", "tooltip-1");

	$.get("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=lopeznoeliab&limit=15&api_key=42188804bb4145d42e9cfbd2e260c53c&format=json", function(data, status){
    
    const trackArrayResponse = data.toptracks.track;
    trackArrayResponse.forEach(function (track) {
    	const newTrack = {
    		name: track.name,
    		artist: track.artist.name,
    		playcount: track.playcount,
    		image: track.image[1]['#text']
    	};
    	topTracksArray.push(newTrack);
    });

		var pie = d3.layout.pie()
								.sort(null)
								.value(function(d){return d.playcount;})
								.padAngle(.02);

		var g = svg.selectAll(".arc")
								.data(pie(topTracksArray))
								.enter()
								.append("g")
								.attr("class","arc")
			         .on("mousemove",function(d){
				        	var mouseVal = d3.mouse(this);
				        	div.style("display","none");
				        	div
					        	.html("<p><span>Track:</span>" + d.data.name +"</p>"+
					        				"<p><span>Artist:</span>" + d.data.artist + "</p>"+
					        				"<p><span>Playcount:</span>" + d.data.playcount + "</p>")
					            .style("left", (d3.event.pageX+12) + "px")
					            .style("top", (d3.event.pageY-10) + "px")
					            .style("opacity", 1)
					            .style("display","block")
					            .style("position", "absolute");
					        })
        				.on("mouseout",function(){div.html(" ").style("display","none");});

		g.append("path")
			.attr("d",arc)
			.style("fill",function(d){ return color(d.data.playcount);})
			.attr("d", arc);
  });

	// 2da visualizacion

	var width = 960,
	    height = 700,
	    radius = Math.min(width, height) / 2;

	var x = d3.scale.linear()
	    .range([0, 2 * Math.PI]);

	var y = d3.scale.sqrt()
	    .range([0, radius]);

	var color = d3.scale.category20c();

	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

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

	d3.json("https://raw.githubusercontent.com/noeliablopez/infovis/981cbe77815b55439ad1cb951bacc308d76ce45a/data/topArtist.json", function(error, root) {
	  node = root;
	  var path = svg.datum(root).selectAll("path")
	      .data(partition.nodes)
	    .enter().append("path")
	      .attr("d", arc)
	      .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
	      .on("click", click)
	      .each(stash);

	  d3.selectAll("input").on("change", function change() {
	    var value = this.value === "count"
	        ? function() { return 1; }
	        : function(d) { return d.size; };

	    path
	        .data(partition.value(value).nodes)
	      .transition()
	        .duration(1000)
	        .attrTween("d", arcTweenData);
	  });

	  function click(d) {
	    node = d;
	    path.transition()
	      .duration(1000)
	      .attrTween("d", arcTweenZoom(d));
	  }
	});

	d3.select(self.frameElement).style("height", height + "px");

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


