import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DateTimeTemp, ForecastModel } from 'src/app/models/forecast.model';

@Component({
    selector: 'forecast',
    templateUrl: './forecast.component.html',
})
export class ForecastComponent implements OnInit {
    constructor(public http: HttpClient) { }

    //variables
    private httpOptions = {
        headers: new HttpHeaders()
    }
    private secret = '36b5b22a6b971b35b6d568597c9fb37f' //would normally hide this but for sake of making sure you can run it
    weatherData: any
    showTemps = false;
    badRequest = false;
    url = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat="
    forecastData = new ForecastModel()

    ngOnInit() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.loadTemps(position.coords.latitude, position.coords.longitude);
        });
    }

    callAPI(latitude: any, longitude: any) {
        return this.http.get(this.url + latitude + "&lon=" + longitude + "&appid=" + this.secret, this.httpOptions).toPromise();
    }

    async loadTemps(latitude: any, longitude: any) {
        try {
            await this.callAPI(latitude, longitude).then(data => this.weatherData = data)
            this.getCleanWeatherData()
            this.badRequest = false;
            this.showTemps = true;
        }
        catch (err) {
            console.log(err)
            this.badRequest = true
            this.showTemps = false;
        }
    }

    getCleanWeatherData() {
        this.forecastData.City = this.weatherData.city.name
        for (let item of this.weatherData.list) {
            let dateTimeTemp = new DateTimeTemp()
            let array = item.dt_txt.split(' ')
            dateTimeTemp.Date = array[0].substring(5)
            dateTimeTemp.Time = array[1].slice(0, 5)
            dateTimeTemp.Temp = Math.round(item.main.temp).toString() + ' °F'

            this.forecastData.DateTimeTemperature.push(dateTimeTemp)
            this.forecastData.Icons.push(item.weather[0].icon)
        }
    }
}

