import {
  ClientSideRowModelModule,
  CsvExportModule,
  ModuleRegistry,
} from 'ag-grid-community';
ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
