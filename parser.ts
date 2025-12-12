import { readFileSync } from "fs";

const csvPath = "./data/data.txt";

// Weather data class
class Weather {

	date: Date
	windDirection: number
	windSpeedHour: number
	windSpeed10Min: number
	maxWindGust: number
	temp: number
	minTemp: number
	dewPointTemp: number
	sunshieDur: number
	radiation: number
	precipitation: number
	pressure: number
	visibility: number
	humidity: number
	code: number
	indicator: number
	fog: boolean
	rain: boolean
	snow: boolean
	thunder: boolean
	ice: boolean

	constructor(

		date: Date,
		windDirection: number,
		windSpeedHour: number,
		windSpeed10Min: number,
		maxWindGust: number,
		temp: number,
		minTemp: number,
		dewPointTemp: number,
		sunshieDur: number,
		radiation: number,
		precipitation: number,
		pressure: number,
		visibility: number,
		humidity: number,
		code: number,
		indicator: number,
		fog: boolean,
		rain: boolean,
		snow: boolean,
		thunder: boolean,
		ice: boolean

	) {

		this.date = date;
		this.windDirection = windDirection;
		this.windSpeedHour = windSpeedHour;
		this.windSpeed10Min = windSpeed10Min;
		this.maxWindGust = maxWindGust;
		this.temp = temp;
		this.minTemp = minTemp;
		this.dewPointTemp = dewPointTemp;
		this.sunshieDur = sunshieDur;
		this.radiation = radiation;
		this.precipitation = precipitation;
		this.pressure = pressure;
		this.visibility = visibility;
		this.humidity = humidity;
		this.code = code;
		this.indicator = indicator;
		this.fog = fog;
		this.rain = rain;
		this.snow = snow;
		this.thunder = thunder;
		this.ice = ice;

	}

}

function readCSV(path: string) {
	
	const csvString = readFileSync(path, "utf-8");
	
	return csvString;

}

function parseStringToBool(data: string) {

	data = data.trim();

	if (!data) { return false; }	

	if (Number(data) == 0) { return false } 

	return true;

}

function parseStringToNumber(data: string) {

	data = data.trim();

	return parseFloat(data);

}

function parseStringToDate(date: string, time: string) {

	date = date.trim();
	time = time.trim();

	const year = parseStringToNumber(date.slice(0, 4));
	const month = parseStringToNumber(date.slice(4, 6));
	const day = parseStringToNumber(date.slice(6, 8));
	const hour = parseStringToNumber(time);	

	return new Date(year, month-1, day, hour);
} 

function parseCell(cell: string | undefined): string {

	if (!cell) {
		return "";
	}

	return cell;

}

function parseCsvString(csvString: string, separator: string) {

	const rows = csvString.split("\n").slice(0, -1);

	const weatherArray: Weather[] = [];

	rows.forEach((row) => {

		const cells = row.split(separator);	

		const date = parseStringToDate(parseCell(cells[1]), parseCell(cells[2])); 

		const windDirection = parseStringToNumber(parseCell(cells[3]));
		const windSpeedHour = parseStringToNumber(parseCell(cells[4]));
		const windSpeed10Min = parseStringToNumber(parseCell(cells[5]));
		const maxWindGust = parseStringToNumber(parseCell(cells[6]));
		const temp = parseStringToNumber(parseCell(cells[7]));
		const minTemp = parseStringToNumber(parseCell(cells[8]));
		const dewPointTemp = parseStringToNumber(parseCell(cells[9]));
		const sunshieDur = parseStringToNumber(parseCell(cells[10]));
		const radiation = parseStringToNumber(parseCell(cells[11]));
		const precipitation = parseStringToNumber(parseCell(cells[12]));
		const pressure = parseStringToNumber(parseCell(cells[13]));
		const visibility = parseStringToNumber(parseCell(cells[14]));
		const humidity = parseStringToNumber(parseCell(cells[15]));
		const code = parseStringToNumber(parseCell(cells[16]));
		const indicator = parseStringToNumber(parseCell(cells[17]));
		const fog = parseStringToBool(parseCell(cells[18]));
		const rain = parseStringToBool(parseCell(cells[19]));
		const snow = parseStringToBool(parseCell(cells[20]));
		const thunder = parseStringToBool(parseCell(cells[21]));
		const ice = parseStringToBool(parseCell(cells[22]));

		const weather = new Weather(
			date,
			windDirection,
			windSpeedHour,
			windSpeed10Min,
			maxWindGust,
			temp,
			minTemp,
			dewPointTemp,
			sunshieDur,
			radiation,
			precipitation,
			pressure,
			visibility,
			humidity,
			code,
			indicator,
			fog,
			rain,
			snow,
			thunder,
			ice

		);

		weatherArray.push(weather);


	});

	return weatherArray;

}

function main() {

	const csvString = readCSV(csvPath);
	const weatherArray = parseCsvString(csvString, ",");

	weatherArray.forEach((weather) => console.log(weather));
}

main();
