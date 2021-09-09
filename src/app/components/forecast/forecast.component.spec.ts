import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ForecastComponent } from './forecast.component';
import * as TypeMoq from "typemoq-continued";

describe('ForecastComponent', () => {
  const httpMock = TypeMoq.Mock.ofType<HttpClient>()
  const forecastComponent = new ForecastComponent(httpMock.object)

  forecastComponent.weatherData = {
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

  forecastComponent.dateTimeTemperature = [['']]

  forecastComponent.icons = ['']

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

  it('should get the dates and times', () => {
    const response = forecastComponent.getWeatherData()
    expect(forecastComponent.dateTimeTemperature[0]).toContain('03-27')
    expect(forecastComponent.dateTimeTemperature[1]).toContain("12-12")
    expect(forecastComponent.dateTimeTemperature[0]).toContain('04:30')
    expect(forecastComponent.dateTimeTemperature[1]).toContain('12:00')
    expect(forecastComponent.icons).toContain('10n')
  })

});
