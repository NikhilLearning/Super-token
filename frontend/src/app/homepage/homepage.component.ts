import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Session from 'supertokens-web-js/recipe/session';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  constructor(
    private router: Router
  ){this.isLoggedIn()}

  async logout () {
    await Session.signOut(); 
    this.router.navigate(['/auth/login']);
  }

  async isLoggedIn() {   
     
    if (await Session.doesSessionExist()) {
      this.router.navigate(['homepage']);
    } else {
      this.router.navigate(['auth/login']);
    }
  }

}
