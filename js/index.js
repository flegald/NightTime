
	var map;
	// Location Coordinates
	var seaLat = 47.6097;
	var seaLng = -122.3331;
	var lakeWLat = 47.811389;
	var lakeWLng = -120.727778;
	var rainLat = 46.8996733;
	var rainLng = -121.6973877;
	var northCascadeLat = 48.771817;
	var northCascadeLng = -121.298465;

	
// Map Functionality

	function initMap(latitude, longitude){		
		var mapBegin = {
    center:new google.maps.LatLng(latitude, longitude),
    zoom: 10,
    disableDefaultUI : true
  	};
  	var map = new google.maps.Map(document.getElementById('map'), mapBegin);
  };

	google.maps.event.addDomListener(window, 'load', initMap(seaLat, seaLng));

	google.maps.event.addDomListener(document.getElementById('userLocation'), 'change', function(event){
		event.preventDefault();
		var option = document.getElementById('userLocation').value;
		if (option === 'nothing'){
			initMap(seaLat, seaLng);
		} else if (option === 'lakeWenatchee'){
			initMap(lakeWLat, lakeWLng);
		} else if (option === 'mtRainier'){
			initMap(rainLat, rainLng);
		} else if (option === 'northCascades'){
			initMap(northCascadeLat, northCascadeLng);
		}
	});

	// Darksy API/Ajax calls

$(function(){

	forecastArray = [];

	function templatePush(){
			$.get('template/forecast.html', function(data){
				$('#forecast').empty();
				for (i = 0; i < forecastArray.length; i ++){
					var compTemp = Handlebars.compile(data);
					var handPush = compTemp(forecastArray[i]);
					$('#forecast').append(handPush);
				}
			})
	}

	$('#userLocation').on('change', function(){
			$.ajax({
				url: "https://api.forecast.io/forecast/7e0ef57fc2466bdf0cb7ed9fd8480413/47.6097, -122.3331",
				data: {
					format: 'json'
				},
				error: function(){
					alert('no go');
				},
				dataType: 'jsonp',
				success: function(data){
					forecastArray.push(data);
				},
				type: 'GET'
			});
			templatePush();
		});


});

	


	
	



