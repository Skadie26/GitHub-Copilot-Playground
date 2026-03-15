import { Component, HostListener } from '@angular/core';
import { BannerComponent } from './components/banner/banner.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WeatherComponent } from './components/weather/weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BannerComponent, SidebarComponent, WeatherComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Weather data properties for banner
  title = 'frontend'; // <-- Added to fix the failing test
  isLoading = true;
  error: string | null = null;
  dataCount = 0;
  isSaving = false;

  // Responsive sidebar properties
  isMobile = false;
  sidebarOpen = false;

  constructor() {
    this.checkScreenSize();
  }

  // Listen for window resize events
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.sidebarOpen = false; // Close sidebar when switching to desktop
    }
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }

  closeSidebar() {
    if (this.isMobile) {
      this.sidebarOpen = false;
    }
  }

  // Method to receive updates from weather component
  onWeatherDataChange(data: {
    isLoading: boolean;
    error: string | null;
    dataCount: number;
  }) {
    this.isLoading = data.isLoading;
    this.error = data.error;
    this.dataCount = data.dataCount;
  }
}
