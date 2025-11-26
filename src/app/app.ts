import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent, NavigationTab } from '@photo-library/shared/ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly activeTab = signal<string>('/');
  protected readonly tabs: NavigationTab[] = [
    { label: 'Photos', path: '/' },
    { label: 'Favorites', path: '/favorites' }
  ];

  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects || event.url;
        if (url === '/' || url.startsWith('/photos')) {
          this.activeTab.set('/');
        } else if (url.startsWith('/favorites')) {
          this.activeTab.set('/favorites');
        }
      });
  }

  onTabChange(path: string): void {
    this.activeTab.set(path);
  }
}
