import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserService} from '../user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  async canActivate() {
    try {
      const result = await this.userService.populate();
      if (!result) {
        this.router.navigate(['/']);
      }
      return result;
    } catch (error) {

    }
  }
}
