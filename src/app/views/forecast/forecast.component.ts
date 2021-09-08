import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
    selector: 'forecast',
    templateUrl: './forecast.component.html',
  })
  export class ForecastComponent {
    constructor(public http: HttpClient){}
    private httpOptions = {
        headers: new HttpHeaders()
    }
    private secret = '36b5b22a6b971b35b6d568597c9fb37f' //would normally hide this but for sake of making sure you can run it
    weatherData: any
    showTemps = false;
    badRequest = false;
    url = "https://api.openweathermap.org/data/2.5/forecast?q="

    convertTemp(temp :any){
        return Math.round((temp - 273.15) * (9/5) + 32)
    }
    
    currentTemp(city: any) {
        return this.http.get(this.url+city+"&appid="+this.secret, this.httpOptions).toPromise();
    }

    async loadTemps(value? : string){
        try{
            await this.currentTemp(value).then(data => this.weatherData = data)
            this.badRequest = false;
            this.showTemps = true;

        }
        catch(err){
            this.badRequest = true
            this.showTemps = false;
        }
        console.log(this.weatherData)
    }

    search(value:string) { 
        this.loadTemps(value)
    }
  }

  