$( document ).ready(function() {

	var currentPage = 1;

	var minutesPerDay = {};

	// for (currentPage <= 0; currentPage++) {
	// 	Things[i]
	// };


	// timeSpentPerDay =
	// 	{
	// 		date: 01 Apr 2016,
	// 		seconds: 50000
	// 	}

	$.get("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=lopeznoeliab&api_key=42188804bb4145d42e9cfbd2e260c53c&format=json", function(data, status){
        //$.each(data.recenttracks.track)
        var date = data.recenttracks[0].date.#text.split(",")[0]
        console.log(data.recenttracks.track[0]);
        console.log(date);
        if ( minutesPerDay[date] === undefined ) {
        	minutesPerDay[date] = {
        		"date": 
        	}
        }


    });
    
});


