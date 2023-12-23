import { NgModule } from '@angular/core';
import { FundLayoutComponent } from './fund-layout/fund-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [BrowserModule, MatIconModule],
  declarations: [
    FundLayoutComponent
  ],
  exports: [
    FundLayoutComponent
  ]
})
export class LayoutsModule { }
