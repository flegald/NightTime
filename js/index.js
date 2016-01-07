
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
	var ephLat = 47.317639;
	var ephLng = -119.553649;
	var ratLat = 47.445825;
	var ratLng = -121.794994;
// Darksy api links
var darkSea = "https://api.forecast.io/forecast/7e0ef57fc2466bdf0cb7ed9fd8480413/47.6097, -122.3331";
var darkEphrata = "https://api.forecast.io/forecast/7e0ef57fc2466bdf0cb7ed9fd8480413/47.317639, -119.553649";
var darkLake = "https://api.forecast.io/forecast/7e0ef57fc2466bdf0cb7ed9fd8480413/47.811389, -120.727778";
var darkRain = 	"https://api.forecast.io/forecast/7e0ef57fc2466bdf0cb7ed9fd8480413/46.8996733, -121.6973877";
var darkCascades = "https://api.forecast.io/forecast/7e0ef57fc2466bdf0cb7ed9fd8480413/48.771817, -121.298465";
var darkRat = "https://api.forecast.io/forecast/7e0ef57fc2466bdf0cb7ed9fd8480413/47.445825, -121.794994";
$(function(){
	$('#hour').hide();
	$('#button').hide();
	$('#about').hide();
});

// Map Functionality

	function initMap(latitude, longitude){		
		var mapBegin = {
    center:new google.maps.LatLng(latitude, longitude),
    zoom: 12,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
     position: google.maps.ControlPosition.RIGHT_CENTER
    },
  	scaleControl: false,
  	scrollwheel: false,
  	disableDoubleClickZoom: true,
  	};
  	var map = new google.maps.Map(document.getElementById('map'), mapBegin);
  };

	google.maps.event.addDomListener(window, 'load', initMap(seaLat, seaLng));

	google.maps.event.addDomListener(document.getElementById('userLocation'), 'change', function(event){
		event.preventDefault();
		var option = document.getElementById('userLocation').value;
		if (option === 'nothing'){
			initMap(seaLat, seaLng);
		} else if (option === 'ephrata'){
			initMap(ephLat, ephLng);
		} else if (option === 'lakeWenatchee'){
			initMap(lakeWLat, lakeWLng);
		} else if (option === 'mtRainier'){
			initMap(rainLat, rainLng);
		} else if (option === 'northCascades'){
			initMap(northCascadeLat, northCascadeLng);
		} else if (option === 'rattleSnake') {
			initMap(ratLat, ratLng);
		}
	});

	// Darksy API/Ajax calls/ Handlebars

$(function(){

	var forecastArray = [];
	var hourlyArray = [];

	function templatePush(){
			$.get('template/forecast.html', function(data){
				$('#forecast').empty();
				for (i = 0; i < forecastArray.length; i ++){
					var compTemp = Handlebars.compile(data);
					var handPush = compTemp(forecastArray[i]);
					$('#forecast').append(handPush);
				}
				
			});
	};

	function hourlyPush(){
			$.get('template/hourly.html', function(data){
				createHourly();
				convertTime();
				$('#hourTable').empty();

				$('#hourTable').prepend("<tr><td>Time</td><td>Temp</td><td>Cloud Cov</td><td>Vis</td><td>Summary</td></tr>");

				for (i = 0; i < 10; i ++){
					var compTemp = Handlebars.compile(data);
					var handPush = compTemp(hourlyArray[i]);
					$('#hourTable').append(handPush);
				}
				console.log(hourlyArray);
		});
	}

	function createHourly(){
		hourlyArray = [];
		for (i = 1; i < 20; i ++){
			hourlyArray.push(forecastArray[0].hourly.data[i]);
			}
		};

	function convertTime(){
		hourlyArray.forEach(function(hours){
			var tempTime = new Date(hours.time * 1000);
			var hour = tempTime.getHours();
			var mins = tempTime.getMinutes();
			var newTime = hour + ":00";
			hours.time = newTime;
		});
	};


	function getForecast(option){
				$.ajax({
					url: option,
					data: {
						format: 'json'
					},
					error: function(){
						alert('failed to load resources');
					},
					dataType: 'jsonp',
					success: function(data){
						forecastArray = [];
						forecastArray.push(data);
						console.log(forecastArray);
						templatePush();
						hourlyPush();
					},
					type: 'GET'
				});
		};

		$('#userLocation').on('change', function(){
			var userChoice = $(this).val();
			$('#button').show();
				if (userChoice === 'nothing'){
					getForecast(darkSea);
					$('#place').text("Seattle");
				} else if (userChoice === 'ephrata') {
					getForecast(darkEphrata);
					$('#place').text("Ephrata");
				} else if (userChoice === 'lakeWenatchee'){
					getForecast(darkLake);
					$('#place').text("Lake Wenatchee State Park");
				} else if (userChoice === 'mtRainier'){
					getForecast(darkLake);
					$('#place').text("Mt. Rainier National Park");
				} else if (userChoice === 'northCascades'){
					getForecast(darkLake);
					$('#place').text("North Cascades National Park");
				} else if (userChoice === 'rattleSnake'){
					getForecast(darkRat);
					$('#place').text("Rattlesnake Ridge");
				}
		});

		$('#button').on('click', function(){
			$('#hour').slideToggle();
			$("html, body").animate({ scrollTop: $(document).height() }, 1000);

		});	
		window.onload = getForecast(darkSea);


	// About Page
	$('#aboutText').on('click', function(){
		$('#about').fadeToggle();
	});
	$('#close').on('click', function(){
		$('#about').fadeToggle();
	});
});

	
	


	
	



