import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent, NavigationTab } from './header.component';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockTabs: NavigationTab[] = [
    { label: 'Photos', path: '/' },
    { label: 'Favorites', path: '/favorites' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tabs', mockTabs);
    fixture.componentRef.setInput('activeTab', '/');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation tabs', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.nav-button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent.trim()).toBe('Photos');
    expect(buttons[1].textContent.trim()).toBe('Favorites');
  });

  it('should mark active tab', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.nav-button');
    expect(buttons[0].classList.contains('active')).toBe(true);
    expect(buttons[1].classList.contains('active')).toBe(false);
  });

  it('should emit tab change event', () => {
    let emittedPath = '';
    component.tabChange.subscribe((path: string) => {
      emittedPath = path;
    });

    component.onTabClick('/favorites');
    expect(emittedPath).toBe('/favorites');
  });
});

