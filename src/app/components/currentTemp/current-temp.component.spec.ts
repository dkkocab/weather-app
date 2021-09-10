import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrentTempComponent } from './current-temp.component';
import * as TypeMoq from "typemoq-continued";

describe('CurrentTempComponent', () => {
  const httpMock = TypeMoq.Mock.ofType<HttpClient>()
  const currentTempComponent = new CurrentTempComponent(httpMock.object)

  currentTempComponent.weatherData = {
    main: {
      temp: '75',
      feels_like: '76',
      temp_min: '68',
      temp_max: '78'
    },
    name: 'Milwaukee'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CurrentTempComponent
      ],
    }).compileComponents();
  });

  it('should create', () => {
    expect(currentTempComponent).toBeTruthy();
  });

  it('should get the Current Temperature data', () => {
    const response = currentTempComponent.getCleanWeatherData()
    expect(currentTempComponent.todayTempData.City).toEqual('Milwaukee')
    expect(currentTempComponent.todayTempData.Current).toEqual('75')
    expect(currentTempComponent.todayTempData.FeelsLike).toEqual('76')
    expect(currentTempComponent.todayTempData.High).toEqual('78')
    expect(currentTempComponent.todayTempData.Low).toEqual('68')
  })

  it('should fail on loading Current Temperature Data', () => {
    const badLong = 123
    const badLat = 321
    const response = currentTempComponent.loadTemps(badLat, badLong)
    expect(currentTempComponent.badRequest).toBeTruthy()
    expect(currentTempComponent.showTemps).toBeFalsy()
  })
});