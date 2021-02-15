/** @format */
//week 4 ex.1
function formatDate(
	date
) {
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
	let dayIndex = date.getDay();
	let days = [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thur",
		"Fri",
		"Sat",
	];

	let day =
		days[
			dayIndex
		];

	return `${days[dayIndex]} ${hours}:${minutes}`;
}

let dateElement = document.querySelector(
	"#date"
);
let currentTime = new Date();

dateElement.innerHTML = formatDate(
	currentTime
);

//week 4 ex. 2

//week5

function showTemperature(
	response
) {
	let h4 = document.querySelector(
		"h4"
	);
	h4.innerHTML = `${response.data.name}`;

	let temperature = Math.round(
		response
			.data
			.main
			.temp
	);
	let currentTemperature = document.querySelector(
		"#temperature"
	);
	currentTemperature.innerHTML = `${temperature}°C`;
}
function showCity(
	city
) {
	let unit =
		"metric";
	let apiKey =
		"f7d4da118c7f49c6b1df6502b95c501b";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

	axios
		.get(
			apiUrl
		)
		.then(
			showTemperature
		);
}

function searchCity(
	event
) {
	event.preventDefault();
	let searchInput = document.querySelector(
		"#search-text-input"
	);
	showCity(
		searchInput.value
	);
}
let form = document.querySelector(
	"#search-form"
);
form.addEventListener(
	"submit",
	searchCity
);

//bonus

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
