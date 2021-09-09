import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';

describe('AppComponent', () => {
    const navbarComponent = new NavbarComponent()

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        NavbarComponent
      ],
    }).compileComponents();
  });

  it('should create', () => {
    expect(navbarComponent).toBeTruthy();
    expect(navbarComponent.title).toBe('nav-bar')
  });
});
