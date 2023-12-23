import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IAuthenticateResponseModel } from '../models/authentication-reponse.model';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private userProfileService: UserProfileService) { }

  public authen(user: string, pass: string): Observable<IAuthenticateResponseModel> {
    let loginResult = new Subject<IAuthenticateResponseModel>()
    setTimeout(() => {
      if (user.toLocaleLowerCase() == 'username' && (pass == 'Qu@nT1um2023' || pass == 'q')) {
        this.userProfileService.signedIn();
        loginResult.next({ IsSuccess: true } as IAuthenticateResponseModel);
      }
      else {
        loginResult.next({ IsSuccess: false } as IAuthenticateResponseModel);
      }
    }, 1000);
    return loginResult.asObservable()
  }
}
