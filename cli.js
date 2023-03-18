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

if (args.n) {
	latitude = args.n;
} else if (args.s) {
	latitude = -args.s
} else if (!latitude) {
	console.log("Latitude must be in range");
    	process.exit(0);
}

if (args.e) {
        longitude = args.e;
} else if (args.w) {
        longitude = -args.w
} else if (!longitute) {
        console.log("Latitude must be in range");
    	process.exit(0);
}

if (args.z) {
	timezone = args.z;
} else {
	timezone_url = timezone;
}
