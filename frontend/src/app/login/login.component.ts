import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { signIn } from 'supertokens-web-js/recipe/emailpassword';
import Session from 'supertokens-web-js/recipe/session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  apiData: any;

  loginForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router, private http: HttpClient) {
    this.isLoggedIn();
  }


  async onSubmit() {
    const { email, password } = this.loginForm.value;

    try {

      let response = await signIn({

        formFields: [
          {
            id: "email",
            value: email as string
          },
          {
            id: "password",
            value: password as string
          }
        ]
      })

      if (response.status === "FIELD_ERROR") {
        response.formFields.forEach(formField => {

          if (formField.id === "email") {
            // Email validation failed (for example incorrect email syntax).
            window.alert(formField.error)
          }
        })
      }
      else if (response.status === "WRONG_CREDENTIALS_ERROR") {
        window.alert("Email password combination is incorrect.")
      }
      else if (response.status === "SIGN_IN_NOT_ALLOWED") {
        window.alert(response.reason)
      }
      else {
        this.router.navigate(['/homepage']);
      }
    } 
    catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message);
      }
      else {
        window.alert("Oops! Something went wrong.");
      }
    }
  }

  getData() {
    this.http.get('http://localhost:3000/getData')
      .subscribe((data) => {

        this.apiData = data;

      },
      (error) => {
        // Handle errors here
        alert(error.message)
      }
    );
  }

  async logout () {
    await Session.signOut(); 
    this.router.navigate(['/auth/login']);
  }
  
  async isLoggedIn() {   
     
    if (await Session.doesSessionExist()) {
      this.router.navigate(['/homepage']);
    } else {
      this.router.navigate(['auth/login']);
    }
  }

}
