import { Component } from '@angular/core';
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword';
import { Router } from '@angular/router';

SuperTokens.init({
  appInfo: {
    apiDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    appName: "Supertoken Learning",
  },
  recipeList: [
    Session.init(),
    EmailPassword.init(),
  ],
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'frontend';

  constructor(
    private router: Router
  ) {
    this.isLoggedIn();
  }

  async isLoggedIn() {    
    if (await Session.doesSessionExist()) {
      this.router.navigate(['/homepage']);
    } else {
      // this.router.navigate(['/auth/login']);
    }
  }
}
