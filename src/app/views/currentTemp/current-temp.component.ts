import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
    selector: 'current-temp',
    templateUrl: './current-temp.component.html',
  })
  export class CurrentTempComponent{

    private httpOptions = {
        headers: new HttpHeaders()
    }
    weatherData: any
    showTemps = false;
    badRequest = false;


    constructor(public http: HttpClient){}

    title = 'current-temp'

    currentTemp(city: any) {
        return this.http.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=36b5b22a6b971b35b6d568597c9fb37f", this.httpOptions).toPromise();
    }

    convertTemp(temp :any){
        return Math.round((temp - 273.15) * (9/5) + 32)
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
    }

    search(value:string) { 
        this.loadTemps(value)
    }
    
  } 