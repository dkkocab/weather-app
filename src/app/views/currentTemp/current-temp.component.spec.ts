import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrentTempComponent } from './current-temp.component';
import * as TypeMoq from "typemoq-continued";

describe('AppComponent', () => {
    const httpMock = TypeMoq.Mock.ofType<HttpClient>()
    const currentTemp = new CurrentTempComponent(httpMock.object)

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

  it('should correctly convert temperatues from Kelvin to Fahrenheit', () => {
    const Kelvin = 300
    const response = currentTemp.convertTemp(Kelvin)
    expect(response).toEqual(80)
  })

});
