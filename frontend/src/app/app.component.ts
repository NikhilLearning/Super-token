import { Component, OnInit } from '@angular/core';
import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword, { signUp } from 'supertokens-web-js/recipe/emailpassword';

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
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor() {

    
  }
  
  ngOnInit(): void {
    this.signUpClicked("CDG.saccfhan@yopmail.com", '123345678A');
  }

  async signUpClicked(email: string, password: string) {
    try {
        let response = await signUp({
            formFields: [{
                id: "email",
                value: email
            }, {
                id: "password",
                value: password
            }]
        });        

        if (response.status === "FIELD_ERROR") {
            // one of the input formFields failed validaiton
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax),
                    // or the email is not unique.
                    window.alert(formField.error)
                } else if (formField.id === "password") {
                    // Password validation failed.
                    // Maybe it didn't match the password strength
                    window.alert(formField.error)
                }
            })
        } else if (response.status === "SIGN_UP_NOT_ALLOWED") { 
            // the reason string is a user friendly message
            // about what went wrong. It can also contain a support code which users
            // can tell you so you know why their sign up was not allowed.
            window.alert(response.reason)
        } else {
            // sign up successful. The session tokens are automatically handled by
            // the frontend SDK.
            alert('sUCCESS')
        }
    } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}
}