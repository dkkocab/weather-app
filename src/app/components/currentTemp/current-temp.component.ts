import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrentTempModel } from 'src/app/models/currentTemp.model';


@Component({
    selector: 'current-temp',
    templateUrl: './current-temp.component.html',
})
export class CurrentTempComponent implements OnInit {
    constructor(public http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders()
    }
    private secret = '36b5b22a6b971b35b6d568597c9fb37f' //would normally hide this but for sake of making sure you can run it
    weatherData: any
    showTemps = false;
    badRequest = false;
    location: any
    url = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat="
    todayTempData = new CurrentTempModel()
    // todayTempData = {
    //     city: '',
    //     current : '',
    //     high : '',
    //     low : '',
    //     feelsLike : ''
    // }

    ngOnInit(){
        navigator.geolocation.getCurrentPosition((position) => {
            this.loadTemps(position.coords.latitude, position.coords.longitude);
          });
    }

    callAPI(latitude : any, longitude: any) {
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
            this.badRequest = true
            this.showTemps = false;
        }
    }

    getCleanWeatherData(){
        this.todayTempData.City = this.weatherData.name
        this.todayTempData.Current = Math.round(this.weatherData.main.temp).toString()
        this.todayTempData.High = Math.round(this.weatherData.main.temp_max).toString()
        this.todayTempData.Low = Math.round(this.weatherData.main.temp_min).toString()
        this.todayTempData.FeelsLike = Math.round(this.weatherData.main.feels_like).toString()
    }
}