import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
    selector: 'current-temp',
    templateUrl: './current-temp.component.html',
  })
  export class CurrentTempComponent implements OnInit{

    private httpOptions = {
        headers: new HttpHeaders()
    }
    weatherData: any
    hello = 'hello'
    self = this
    temp = 0

    constructor(public http: HttpClient){}

    title = 'current-temp'

    currentTemp() {
        return this.http.get("https://api.openweathermap.org/data/2.5/weather?q=London&appid=36b5b22a6b971b35b6d568597c9fb37f", this.httpOptions).toPromise();
    }

    convertTemp(temp :any){
        return Math.round((temp - 273.15) * (9/5) + 32)
    }

    async ngOnInit(){
        await this.currentTemp().then(data => this.weatherData = data)    
    }
    
  } 