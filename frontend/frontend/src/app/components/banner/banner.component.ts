import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SVG_ICONS } from '../../shared/icons/svg-icons';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  @Input() isLoading = false;
  @Input() error: string | null = null;
  @Input() dataCount = 0;
  @Input() isSaving = false;

  // Named icon references for better readability
  readonly icons = {
    cloud: SVG_ICONS.CLOUD,
    loadingSpinner: SVG_ICONS.LOADING_SPINNER,
    warning: SVG_ICONS.WARNING_CIRCLE,
    chartColumn: SVG_ICONS.CHART_COLUMN,
  };
}
