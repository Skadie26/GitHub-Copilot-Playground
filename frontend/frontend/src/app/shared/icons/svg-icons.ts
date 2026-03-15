// SVG Icon Definitions
// Centralized location for all SVG path definitions with descriptive names

export interface SvgIcon {
  name: string;
  viewBox: string;
  path: string;
  description: string;
}

export const SVG_ICONS = {
  // Weather and cloud icons
  CLOUD: {
    name: 'cloud',
    viewBox: '0 0 24 24',
    path: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z',
    description: 'Cloud icon for weather display',
  } as SvgIcon,

  // Loading and progress indicators
  LOADING_SPINNER: {
    name: 'loading-spinner',
    viewBox: '0 0 24 24',
    path: 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 12C21 13.1 20.1 14 19 14C17.9 14 17 13.1 17 12C17 10.9 17.9 10 19 10C20.1 10 21 10.9 21 12ZM6 12C6 13.1 5.1 14 4 14C2.9 14 2 13.1 2 12C2 10.9 2.9 10 4 10C5.1 10 6 10.9 6 12ZM6.75 5.67C7.58 4.84 8.94 4.84 9.77 5.67C10.6 6.5 10.6 7.86 9.77 8.69C8.94 9.52 7.58 9.52 6.75 8.69C5.92 7.86 5.92 6.5 6.75 5.67ZM14.23 15.31C15.06 14.48 16.42 14.48 17.25 15.31C18.08 16.14 18.08 17.5 17.25 18.33C16.42 19.16 15.06 19.16 14.23 18.33C13.4 17.5 13.4 16.14 14.23 15.31Z',
    description: 'Animated loading spinner with multiple dots',
  } as SvgIcon,

  // Error and warning icons
  WARNING_CIRCLE: {
    name: 'warning-circle',
    viewBox: '0 0 24 24',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    description: 'Warning icon with exclamation mark in circle',
  } as SvgIcon,

  // Data and chart icons
  CHART_COLUMN: {
    name: 'chart-column',
    viewBox: '0 0 24 24',
    path: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
    description: 'Column chart icon for data visualization',
  } as SvgIcon,

  // Action icons
  SAVE_DISK: {
    name: 'save-disk',
    viewBox: '0 0 24 24',
    path: 'M17 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z',
    description: 'Classic floppy disk save icon',
  } as SvgIcon,

  // Navigation icons
  HOME: {
    name: 'home',
    viewBox: '0 0 24 24',
    path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    description: 'Home/dashboard icon',
  } as SvgIcon,

  SETTINGS_GEAR: {
    name: 'settings-gear',
    viewBox: '0 0 24 24',
    path: 'M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z',
    description: 'Settings gear icon',
  } as SvgIcon,

  NOTIFICATION_BELL: {
    name: 'notification-bell',
    viewBox: '0 0 24 24',
    path: 'M12,2C13.05,2 14,2.95 14,4C14,4.1 14,4.2 14,4.3L14.1,4.3C15.2,4.6 16,5.7 16,7V11C16,13.8 17.8,16 19,16H5C6.2,16 8,13.8 8,11V7C8,5.7 8.8,4.6 9.9,4.3L10,4.3C10,4.2 10,4.1 10,4C10,2.95 10.95,2 12,2ZM10,20H14C14,21.1 13.1,22 12,22C10.9,22 10,21.1 10,20Z',
    description: 'Notification bell icon',
  } as SvgIcon,

  // Weather specific icons
  SUN: {
    name: 'sun',
    viewBox: '0 0 24 24',
    path: 'M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.11,14C3.25,14.97 3.5,15.76 3.94,16.5C4.36,17.22 4.9,17.84 5.5,18.35L3.34,17M20.65,17L18.5,18.35C19.1,17.84 19.64,17.22 20.06,16.5C20.5,15.76 20.75,14.97 20.89,14L20.65,17M20.89,10.79C20.75,10 20.5,9.24 20.06,8.5C19.64,7.78 19.1,7.16 18.5,6.65L20.65,7L20.89,10.79M12,22L9.61,18.58C10.35,18.85 11.16,19 12,19C12.84,19 13.65,18.85 14.39,18.58L12,22Z',
    description: 'Bright sun icon',
  } as SvgIcon,

  WATER_DROP: {
    name: 'water-drop',
    viewBox: '0 0 24 24',
    path: 'M12,2C13.73,7.27 18,7.33 18,13A6,6 0 0,1 12,19A6,6 0 0,1 6,13C6,7.33 10.27,7.27 12,2M12,17A4,4 0 0,0 16,13C16,10.36 14.36,8.72 12,4.72C9.64,8.72 8,10.36 8,13A4,4 0 0,0 12,17Z',
    description: 'Water droplet icon for rain/humidity',
  } as SvgIcon,

  CHEVRON_RIGHT: {
    name: 'chevron-right',
    viewBox: '0 0 24 24',
    path: 'M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z',
    description: 'Right arrow/chevron for navigation',
  } as SvgIcon,
} as const;

// Helper function to get icon by name
export function getIcon(iconName: keyof typeof SVG_ICONS): SvgIcon {
  return SVG_ICONS[iconName];
}

// Helper function to create SVG element with proper attributes
export function createSvgIcon(
  iconName: keyof typeof SVG_ICONS,
  className?: string
): string {
  const icon = getIcon(iconName);
  const classAttr = className ? ` class="${className}"` : '';

  return `
    <svg${classAttr} xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" fill="currentColor">
      <path d="${icon.path}"/>
    </svg>
  `.trim();
}

// Export icon names as a type for better TypeScript support
export type IconName = keyof typeof SVG_ICONS;
