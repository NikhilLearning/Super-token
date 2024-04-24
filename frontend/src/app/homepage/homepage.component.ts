import { Component } from '@angular/core';
import Session from 'supertokens-web-js/recipe/session';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  async logout () {
    await Session.signOut(); 
    window.location.href = "/homepage"; // or to wherever your logic page is
  }

}
