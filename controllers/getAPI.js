// Get user's IP
const address = require('address');

// Turns IP into Location
const geoip = require('geoip-lite');

// Gets Weather Data
const fetch = require('node-fetch');

exports.getAPI = (req, res, next) => {
	try {
		// https://www.npmjs.com/package/address
		address.ip();
		const ip = address.ip();

		// https://www.npmjs.com/package/geoip-lite
		const geo = geoip.lookup(ip);

		let latitude;
		let longitude;
		let country;
		let city;

		if (geoip.lookup(ip) !== null) {
			latitude = geo.ll[0];
			longitude = geo.ll[1];
			country = geo.country;
			city = geo.city;
		} else {
			// Callback if IP is invalid (e.g. Localhost)
			latitude = 51.5074;
			longitude = 0.1278;
			country = 'GB';
			city = 'London';
		}

		// fetch(`http://localhost:3000`).then((res) => res.json()).then((result) => console.log(result));

		fetch(`< API Fetch Source + Latitude + Longitude + API KEY >`)
			.then((res) => res.json())
			.then((data) => {
				const currentTempF = data.currently.temperature.toFixed(0) + " °F";
				const currentTempC = ((data.currently.temperature - 32) * (5 / 9)).toFixed(0) + " °C";
				const apparentTemperatureF = data.currently.apparentTemperature.toFixed(0) + " °F";
				const apparentTemperatureC = ((data.currently.apparentTemperature - 32) * (5 / 9)).toFixed(0) + " °C";
				const summaryCurrent = data.currently.summary;
				const summaryDay = data.daily.summary;
				const tempMaxF = data.daily.data[0].temperatureMax.toFixed(0);
				const tempMaxC = ((data.daily.data[0].temperatureMax - 32) * (5 / 9)).toFixed(0);
				const tempMinF = data.daily.data[0].temperatureMin.toFixed(0);
				const tempMinC = ((data.daily.data[0].temperatureMin - 32) * (5 / 9)).toFixed(0);
				const icon = data.currently.icon;

				res.status(200).json({
					success: true,
					status: '200',
					latitude: latitude,
					longitude: longitude,
					country: country,
					city: city,
					currentTempF: currentTempF,
					currentTempC: currentTempC,
					apparentTempF: apparentTemperatureF,
					apparentTempC: apparentTemperatureC,
					tempMaxF: tempMaxF,
					tempMaxC: tempMaxC,
					tempMinF: tempMinF,
					tempMinC: tempMinC,
					summaryCurrent: summaryCurrent,
					summaryDay: summaryDay,
					icon
				});
			});
	} catch (err) {
		next(err);
	}
};
