import { Injectable } from '@angular/core';
import { IMenuModel } from '../models/menu.model';
import { SummaryComponent } from 'src/app/modules/internal-area/fund/summary/summary.component';
import { PortalComponent } from 'src/app/modules/internal-area/portal/portal.component';
import { PerformanceComponent } from 'src/app/modules/internal-area/fund/performance/performance.component';
import { FileManagerComponent } from 'src/app/modules/internal-area/fund/file-manager/file-manager.component';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  getMenu(): Array<IMenuModel> {
    return [
      { Path: 'portal', Name: 'Portal', Component: PortalComponent, IsShowInNavigation: false, Childs: [] } as IMenuModel,
      { Path: 'client/:clientId/summary', Name: 'Investor summary', Component: SummaryComponent, IsShowInNavigation: true, Childs: [] } as IMenuModel,
      { Path: 'client/:clientId/fund/:fundId', Name: 'Fund performance', Component: PerformanceComponent, IsShowInNavigation: true, ChildMethod: 'getFunds', Childs: [] } as IMenuModel,
      { Name: 'Highlighted portfolio', Component: SummaryComponent, IsShowInNavigation: true, ChildMethod: 'getPortfolio', Childs: [] } as IMenuModel,
      { Path: 'client/:clientId/file-manager/:docId', Name: 'File manager', Component: FileManagerComponent, IsShowInNavigation: true, ChildMethod: 'getFileManager', Childs: [] } as IMenuModel
    ]
  }
}
