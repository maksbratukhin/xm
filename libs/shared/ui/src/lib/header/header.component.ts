import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavigationTab {
  label: string;
  path: string;
}

@Component({
  selector: 'lib-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  tabs = input.required<NavigationTab[]>();
  activeTab = input.required<string>();
  tabChange = output<string>();

  onTabClick(path: string): void {
    this.tabChange.emit(path);
  }
}


