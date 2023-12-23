import { Component, OnInit } from '@angular/core';
import { IMenuModel } from 'src/app/common/models/menu.model';
import { NavigationService } from 'src/app/common/services/navigation.service';
import { FundService } from '../../../services/fund.services';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { UserProfileService } from 'src/app/common/services/user-profile.service';
@Component({
  selector: 'app-fund-layout',
  templateUrl: './fund-layout.component.html'
})
export class FundLayoutComponent implements OnInit {

  menus: Array<IMenuModel> = []
  collapseState: Map<number, boolean> = new Map<number, boolean>()
  isShowSideBar: boolean = false
  logoUrl?: string
  currentPath?: string
  constructor(
    private navigationService: NavigationService,
    private clientService: ClientService,
    private fundService: FundService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userProfileService: UserProfileService
  ) {

  }

  ngOnInit(): void {
    this.menus = this.navigationService.getMenu()
    this.updateCurrentRoute();
    this.router.events.subscribe(e => {
      this.updateCurrentRoute();
    });
    let clientId = this.getCurrentClientId();
    this.updateMenuUrl(this.menus, clientId);
    this.loadChildMenu(clientId);
    this.loadClientLogo(clientId);
  }

  updateCurrentRoute() {
    this.currentPath = this.router.url.replace(/^\//, '');
  }

  getCurrentClientId() {
    return this.activatedRoute.snapshot.params['clientId'];
  }

  loadChildMenu(clientId: string) {
    for (const element of this.menus) {
      if (element.ChildMethod) {
        (this.fundService as any)[(element.ChildMethod)](clientId)
          .subscribe((result: IMenuModel[]) => {
            element.Childs = result;
          });
      }
    }
  }

  loadClientLogo(clientId: string) {
    this.clientService.getClient(clientId).subscribe(result => {
      this.logoUrl = result[0].Logo;
    });
  }

  toggleMenu(): void {
    this.isShowSideBar = !this.isShowSideBar;
    window.dispatchEvent(new Event('resize'));
  }

  toggleSubMenu(key: number): void {
    this.collapseState.set(key, !this.collapseState.get(key));
  }

  selectMenu(menu: IMenuModel) {
    if (menu.Path) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () { return false; };
      this.router.navigate([menu.Path]);
    }
  }

  goToPortal() {
    this.router.navigate(['portal']);
  }

  signOut() {
    this.userProfileService.signedOut();
    this.router.navigate([''], { queryParams: { signOut: '1' } });
  }

  updateMenuUrl(menus: IMenuModel[], clientId: string) {
    let target = ':clientId';
    menus.forEach(t => {
      t.Path = t.Path?.replace(target, clientId);
    });
  }
}