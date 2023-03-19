#!/usr/bin/env node

import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone";

const args = minimist(process.argv.slice(2));

if (args.h) {
	console.log('Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE');
	console.log('    -h            Show this help message and exit.');
	console.log('    -n, -s        Latitude: N positive; S negative.');
	console.log('    -e, -w        Longitude: E positive; W negative.');
	console.log('    -z            Time zone: uses tz.guess() from moment-timezone by default.');
	console.log('    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.');
	console.log('    -j            Echo pretty JSON from open-meteo API and exit.');
	process.exit(0);
}

const timezone = moment.tz.guess()

let latitude;
let longitude;
let timezone_url;
let day;

if (args.n) {
	latitude = args.n;
} else if (args.s) {
	latitude = -args.s
}

if (args.e) {
        longitude = args.e;
} else if (args.w) {
        longitude = -args.w
}

if (args.z) {
	timezone = args.z;
} else {
	timezone_url = timezone;
}

if (args.d) {
	day = args.d;
}

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&timezone=' + timezone_url);

// Get the data from the request
const data = await response.json();


const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}

if (args.j) {
    console.log(data);
    process.exit(0);
}
