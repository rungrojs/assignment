import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary/summary.component';
import { PerformanceComponent } from './performance/performance.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { LayoutsModule } from './layouts/layouts.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree'
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    SummaryComponent,
    PerformanceComponent,
    FileManagerComponent,
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    GoogleChartsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRippleModule,
    MatTreeModule,
    MatIconModule,
    MatCheckboxModule,
    MatMenuModule
  ]
})
export class FundModule { }
