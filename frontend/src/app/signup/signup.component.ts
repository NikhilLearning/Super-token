import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { signUp } from 'supertokens-web-js/recipe/emailpassword';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  async onSubmit() {
    const {email, password} = this.profileForm.value;

    try {
      let response = await signUp({
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
      });        

      if (response.status === "FIELD_ERROR") {
        response.formFields.forEach(formField => {
          if (formField.id === "email") {
            // Email validation failed (for example incorrect email syntax),
            // or the email is not unique.
            alert(formField.error)
          }
          else if (formField.id === "password") {
            // Password validation failed.
            // Maybe it didn't match the password strength
            alert(formField.error)
          }  
        })
      }
      else if (response.status === "SIGN_UP_NOT_ALLOWED") {
        // the reason string is a user friendly message
        // about what went wrong. It can also contain a support code which users
        // can tell you so you know why their sign up was not allowed.
        alert(response.reason)
      }
      else {
        alert('sUCCESS')
      }
    } 
    catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        alert(err.message);
      }
      else {
        alert("Oops! Something went wrong.");
      }
    }
  }

}
