import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingModule } from './portal/portal.module';
import { FundService } from './services/fund.services';
import { FundModule } from './fund/fund.module';
import { ClientService } from './services/client.service';
import { FileManagerService } from './services/file-manager.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LandingModule,
    FundModule
  ],
  providers: [FundService, ClientService, FileManagerService]
})
export class InternalAreaModule { }
