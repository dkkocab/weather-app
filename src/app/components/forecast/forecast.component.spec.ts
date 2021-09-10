import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ForecastComponent } from './forecast.component';
import * as TypeMoq from "typemoq-continued";

describe('ForecastComponent', () => {
  const httpMock = TypeMoq.Mock.ofType<HttpClient>()
  const forecastComponent = new ForecastComponent(httpMock.object)

  forecastComponent.weatherData = {
    city: {
      name: 'Detroit'
    },
    list: [
      {
        dt_txt: "1998-03-27 04:30:23",
        weather: [{ icon: '10n' }],
        main: {
          temp: '75'
        }
      },
      {
        dt_txt: "2021-12-12 12:00:00",
        weather: [{ icon: '10n' }],
        main: {
          temp: '75'
        }
      }

    ]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ForecastComponent
      ],
    }).compileComponents();
  });

  it('should create', () => {
    expect(forecastComponent).toBeTruthy();
  });

  it('should get the Forecast data', () => {
    const response = forecastComponent.getCleanWeatherData()
    expect(forecastComponent.forecastData.DateTimeTemperature[0].Date).toEqual('03-27')
    expect(forecastComponent.forecastData.DateTimeTemperature[0].Time).toEqual('04:30')
    expect(forecastComponent.forecastData.DateTimeTemperature[1].Date).toEqual('12-12')
    expect(forecastComponent.forecastData.DateTimeTemperature[1].Time).toEqual('12:00')
    expect(forecastComponent.forecastData.Icons).toContain('10n')
    expect(forecastComponent.forecastData.City).toEqual('Detroit')
  })

  it('should fail on getting Forecast data' ,() => {
    const badLong = 123
    const badLat = 321
    const response = forecastComponent.loadTemps(badLat, badLong)
    expect(forecastComponent.badRequest).toBeTruthy()
    expect(forecastComponent.showTemps).toBeFalsy()
  })
});
