import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
    dateTimeTemperature = [['']]
    icons = [' ']

    ngOnInit() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.loadTemps(position.coords.latitude, position.coords.longitude);
        });
    }

    currentTemp(latitude: any, longitude: any) {
        return this.http.get(this.url + latitude + "&lon=" + longitude + "&appid=" + this.secret, this.httpOptions).toPromise();
    }

    async loadTemps(latitude: any, longitude: any) {
        try {
            await this.currentTemp(latitude, longitude).then(data => this.weatherData = data)
            this.getWeatherData()
            this.badRequest = false;
            this.showTemps = true;
        }
        catch (err) {
            this.badRequest = true
            this.showTemps = false;
        }
    }

    getWeatherData(){
        this.dateTimeTemperature.pop()
        this.icons.pop()
        for(let item of this.weatherData.list) {
            let array = item.dt_txt.split(' ')
            let day = array[0].substring(5)
            let time = array[1].slice(0,5)
            let icon = item.weather[0].icon
            let temp = Math.round(item.main.temp).toString() + ' °F'
            this.dateTimeTemperature.push([day, time, temp])
            this.icons.push(icon)
        }
    }
}

