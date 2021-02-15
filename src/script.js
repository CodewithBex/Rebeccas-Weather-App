/** @format */
//week 4
function showTime(
	event
) {
	event.preventDefault();
	let searchInput = document.querySelector(
		"#search-text-input"
	);

	let h4 = document.querySelector(
		"h4"
	);
	h4.innerHTML = `${searchInput.value}`;
}
//let form = document.querySelector(
//	"#search-form"
//);

//form.addEventListener(
//	"submit"
//);

let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function formatDate(
	date
) {
	let currentDay =
		days[
			date.getDay()
		];
	//let hours = date.getHours();
	// if (hours < 10) {
	// hours = `0${hours}`;
	// }
	// let minutes = date.getMinutes();
	// if (minutes < 10) {
	// minutes = `0${minutes}`;
	//}
	// let currentMonth = months[date.getMonth()];
	// let currentDate = date.getDate();
	let currentHour = date.getHours();
	let currentMinutes = date.getMinutes();
	let hours = date.getHours();

	let formattedDate = ` ${currentHour}:${currentMinutes}`;
	return formattedDate;
}

//https://stackoverflow.com/questions/563406/add-days-to-javascript-date
function addDays(
	date,
	days
) {
	var result = new Date(
		date
	);
	result.setDate(
		result.getDate() +
			days
	);
	return result;
}

console.log(
	formatDate(
		new Date()
	)
);

let t0 = new Date();
document.getElementById(
	"time"
).innerHTML = formatDate(
	t0
);

document.getElementById(
	"day-0"
).innerHTML =
	"Today";

var i;
for (
	i = 1;
	i <
	6;
	i++
) {
	document.getElementById(
		`day-${i}`
	).innerHTML =
		days[
			addDays(
				t0,
				i
			).getDay()
		];
}
// document.getElementById('day-1').innerHTML = days[addDays(t0, 1).getDay()]
// document.getElementById('day-2').innerHTML = days[addDays(t0, 2).getDay()]
// document.getElementById('day-3').innerHTML = days[addDays(t0, 3).getDay()]
// document.getElementById('day-4').innerHTML = days[addDays(t0, 4).getDay()]
// document.getElementById('day-5').innerHTML = days[addDays(t0, 5).getDay()]

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
