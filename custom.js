
// YOU WILL NEED TO ADD YOUR OWN API KEY IN QUOTES ON LINE 5, EVEN FOR THE PREVIEW TO WORK.
// 
// GET YOUR API HERE https://console.developers.google.com/apis/api


// https://developers.google.com/youtube/v3/docs/playlistItems/list

// https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=webtut-195115&duration=PT1H

// <iframe width="560" height="315" src="https://www.youtube.com/embed/q" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

// https://i.ytimg.com/vi/qxWrnhZEuRU/mqdefault.jpg


$(document).ready(function(){

	var key = "AIzaSyC5zRW7OHkadBRTE6sTeFGWE0MG-hmvB5E";
	var playlist = "PL3nwQ3nvD3nx5zukedRCJZdh-IKiPZWSj";
	var URL = 'https://youtube.googleapis.com/youtube/v3/playlistItems';

	var options = {
		part:'snippet',
		key:key,
		playlistId:playlist,
		maxResults:20,
	}

     loadvids();

	function loadvids() {
		$.getJSON(URL,options,function(data){
			console.log(data);
			var id = data.items[0].snippet.resourceId.videoId;
			mainVdive(id);
			loopvideo(data)
		});
	}



	function mainVdive(id){
		$('#video').html(`
			<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			`);}

    function loopvideo(data) {
    	$.each(data.items, function(i,item){

    		var lopid = item.snippet.thumbnails.medium.url;
    		var title = item.snippet.title;
    		var desc  = item.snippet.description.substring(0,150);
    		var vid   = item.snippet.resourceId.videoId;
      $('main').append(`
		<article class="item" data-key="${vid}">
			<img src="${lopid}" class="thum">
			<div class="details">
				<h4>${title}</h4>
				<p>${desc}</p>
			</div>
		</article>
      	`);

    	});
    	}

    	$('main').on('click','article',function(){
    		var id = $(this).attr('data-key');
    		mainVdive(id);
    	});

});