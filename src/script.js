/** @format */

//Date and Time

function formatDate(
	timestamp
) {
	let date = new Date(
		timestamp
	);
	let hours = date.getHours();
	if (
		hours <
		10
	) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (
		minutes <
		10
	) {
		minutes = `0${minutes}`;
	}
	let days = [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat",
	];
	let day =
		days[
			date.getDay()
		];

	return `${day} ${hours}:${minutes}`;
}
//Todays weather

function showTemperature(
	response
) {
	console.log(
		response.data
	);
	let cityeElement = document.querySelector(
		"#city"
	);
	let temperatureElement = document.querySelector(
		"#temperature"
	);

	let descriptionElement = document.querySelector(
		"#description"
	);

	let humidityElement = document.querySelector(
		"#humidity"
	);

	let windElement = document.querySelector(
		"#wind"
	);

	let dateElement = document.querySelector(
		"#date"
	);

	celciusTemperature =
		response
			.data
			.main
			.temp;

	cityeElement.innerHTML =
		response.data.name;

	temperatureElement.innerHTML = Math.round(
		response
			.data
			.main
			.temp
	);

	descriptionElement.innerHTML =
		response.data.weather[0].description;

	humidityElement.innerHTML =
		response.data.main.humidity;

	windElement.innerHTML = Math.round(
		response
			.data
			.wind
			.speed
	);

	dateElement.innerHTML = formatDate(
		response
			.data
			.dt *
			1000
	);
}
//search engine

function search(
	city
) {
	let unit =
		"metric";
	let apiKey =
		"f7d4da118c7f49c6b1df6502b95c501b";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

	axios
		.get(
			apiUrl
		)
		.then(
			showTemperature
		);
}

function handleSubmit(
	event
) {
	event.preventDefault();
	let cityInputElement = document.querySelector(
		"#city-input"
	);
	search(
		cityInputElement.value
	);
}

// Unit Conversion
function showFahrenheitTemperature(
	event
) {
	event.preventDefault();
	let temperatureElement = document.querySelector(
		"#temperature"
	);
	celciusLink.classList.remove(
		"active"
	);
	fahrenheitLink.classList.add(
		"active"
	);
	let FahrenheitTemperature =
		(celciusTemperature *
			9) /
			5 +
		32;

	temperatureElement.innerHTML = Math.round(
		FahrenheitTemperature
	);
}

function showcelciusTemperature(
	event
) {
	event.preventDefault();
	celciusLink.classList.add(
		"active"
	);
	fahrenheitLink.classList.remove(
		"active"
	);
	let temperatureElement = document.querySelector(
		"#temperature"
	);
	temperatureElement.innerHTML = Math.round(
		celciusTemperature
	);
}

// clicks and sumbit

let celciusTemperature = null;

let form = document.querySelector(
	"#search-form"
);
form.addEventListener(
	"submit",
	handleSubmit
);

let fahrenheitLink = document.querySelector(
	"#fahrenheit-link"
);

fahrenheitLink.addEventListener(
	"click",
	showFahrenheitTemperature
);

let celciusLink = document.querySelector(
	"#celcius-link"
);

celciusLink.addEventListener(
	"click",
	showcelciusTemperature
);
search(
	"London"
);

//current location button

function currentPosition(
	position
) {
	let lat =
		position
			.coords
			.latitude;
	let long =
		position
			.coords
			.longitude;
	let unit =
		"metric";
	let apiKey =
		"f7d4da118c7f49c6b1df6502b95c501b";

	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;

	axios
		.get(
			apiUrl
		)
		.then(
			showTemperature
		);
}

function handleClick() {
	navigator.geolocation.getCurrentPosition(
		currentPosition
	);
}

let currentLocation = document.querySelector(
	"#current-location"
);
currentLocation.addEventListener(
	"click",
	handleClick
);
