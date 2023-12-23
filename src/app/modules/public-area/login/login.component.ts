import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false
  isSignOut: boolean = false
  isSignOutHide: boolean = false
  lastError: string | undefined

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isSignOut = this.activatedRoute.snapshot.queryParams['signOut'] === '1';
    if (this.isSignOut) {
      setTimeout(() => {
        this.isSignOutHide = true;
        this.router.navigate(
          [''],
          {
            relativeTo: this.activatedRoute,
            queryParams: { signOut: null },
            queryParamsHandling: 'merge'
          }
        );
      }, 3000);
    }
  }

  login(username: string, password: string): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.lastError = '';
    this.authenticationService.authen(username, password).subscribe(result => {
      if (result.IsSuccess) {
        this.router.navigate(['portal']);
      } else {
        this.lastError = 'Invalid username or password, please try again.';
        this.loading = false;
      }
    });
  }
}
