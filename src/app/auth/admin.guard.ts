import { Injectable }             from '@angular/core';
import { Router, CanActivate }    from '@angular/router';
import { Observable }             from 'rxjs/Observable';
import { AuthenticationService }  from './authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAdmin) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
