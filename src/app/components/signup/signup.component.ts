import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup
  errorMsg: String = ""
  path!: string
  file: any
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }
  ngOnInit() {
    this.path = this.router.url
    console.log("path : ", this.path);
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    })
  }
  signup() {
    let user = this.signupForm.value;
    user.role = (this.path == "/signup") ? "client" : "admin";
    this.userService.signUp(user, this.file).subscribe(
      (data) => {
        console.log("user : ", data);
        if (data.msg == "2") {
          this.errorMsg = "User already exists"
        }
        else if (data.msg == "3") {
          this.errorMsg = "User not saved"
        }
        else {
          this.router.navigate(["/login"])
        }
      }
    )
  }
  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      console.log("here is selected file ", this.file);
    }
  }



}
