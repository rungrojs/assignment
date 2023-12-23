import { Component, OnInit } from '@angular/core';
import { FundService } from '../services/fund.services';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { UserProfileService } from 'src/app/common/services/user-profile.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  fundDatas?: Array<any>

  constructor(
    private clientService: ClientService,
    private router: Router,
    private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(result => {
      this.fundDatas = result;
    });
  }

  viewClientSummary(fundId: string) {
    this.router.navigate([`client/${fundId}/summary`]);
  }

  viewFundDetail(fundId: string, reportId: string) {
    this.router.navigate([`client/${fundId}/fund/${reportId}`]);
  }

  signOut() {
    this.userProfileService.signedOut();
    this.router.navigate([''], { queryParams: { signOut: '1' } });
  }
}
