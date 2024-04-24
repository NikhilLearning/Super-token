import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Session from 'supertokens-web-js/recipe/session';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  userId: string = '';
  apiData: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ){
    this.isLoggedIn()
  }

  getData() {
    this.http.get('http://localhost:3000/getData')
      .subscribe((data) => {

        this.apiData = data;

      },(error)=>{
        alert(error.message)
      });
  }

  async logout () {
    await Session.signOut(); 
    this.router.navigate(['/auth/login']);
  }

  async isLoggedIn() {   
    

    if (await Session.doesSessionExist()) {
      
      this.userId = await Session.getUserId();
      this.router.navigate(['homepage']);
    }
    else {
      this.router.navigate(['auth/login']);
    }
  }

}
