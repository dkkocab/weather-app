import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrentTempComponent } from './current-temp.component';
import * as TypeMoq from "typemoq-continued";

describe('CurrentTempComponent', () => {
    const httpMock = TypeMoq.Mock.ofType<HttpClient>()
    const currentTempComponent = new CurrentTempComponent(httpMock.object)

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

  it('should fail on search' ,() => {
    const badSearch = 123
    const bad = 321
    const response = currentTempComponent.loadTemps(badSearch, bad)
    expect(currentTempComponent.badRequest).toBeTruthy()
    expect(currentTempComponent.showTemps).toBeFalsy()
  })

});
