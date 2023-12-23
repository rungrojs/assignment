import { NgModule } from '@angular/core';
import { ROUTES, Route, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/public-area/login/login.component';
import { NavigationService } from './common/services/navigation.service';
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: ROUTES,
      useFactory: (navigationService: NavigationService) => {
        let menus = navigationService.getMenu();
        menus.forEach(t => {
          if (t.Path) {
            routes.push({ path: t.Path, component: t.Component, canActivate: [AuthGuard] } as Route);
          }
        })
        return routes;
      },
      multi: true,
      deps: [NavigationService]
    }
  ]
})

export class AppRoutingModule { }
