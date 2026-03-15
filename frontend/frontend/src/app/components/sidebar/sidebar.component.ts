import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() isMobile = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  isCollapsed = false;

  menuItems = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      active: false,
    },
    {
      icon: 'weather',
      label: 'Weather',
      active: true,
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      active: false,
    },
    {
      icon: 'settings',
      label: 'Settings',
      active: false,
    },
    {
      icon: 'notifications',
      label: 'Notifications',
      active: false,
    },
  ];

  selectMenuItem(index: number) {
    this.menuItems.forEach((item, i) => {
      item.active = i === index;
    });
  }

  onToggleSidebar() {
    if (this.isMobile) {
      this.toggleSidebar.emit();
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
