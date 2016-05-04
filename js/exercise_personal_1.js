$( document ).ready(function() {

	var topTracksArray = [];
	var width = 300;
	var height = 300;
	var a = width / 2;
	var b = height / 2;

	var scale = d3.scale.linear()
                  .domain([1, 25])
                  .range([1, 300]);

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

	$.get("http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=lopeznoeliab&limit=20&api_key=42188804bb4145d42e9cfbd2e260c53c&format=json", function(data, status){
    
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
					        	.html("<p><span>Canción:</span>" + d.data.name +"</p>"+
					        				"<p><span>Artista:</span>" + d.data.artist + "</p>"+
					        				"<p><span>Reproducciones:</span>" + d.data.playcount + "</p>")
					            .style("left", (d3.event.pageX+12) + "px")
					            .style("top", (d3.event.pageY-10) + "px")
					            .style("opacity", 1)
					            .style("display","block")
					            .style("position", "absolute");
					        })
        				.on("mouseout",function(){div.html(" ").style("display","none");});

		g.append("path")
			.attr("d",arc)
			.style("fill",function(d){ return color(d.data.playcount);});
  });
});


