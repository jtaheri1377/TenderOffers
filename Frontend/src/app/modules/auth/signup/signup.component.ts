import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { AuthService } from "src/app/core/services/auth.service";
import { Signup } from "../models/signup.model";
import { UserType } from "src/app/core/Enums/user";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({
    fullname: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    comment: new FormControl("", Validators.required),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.auth.getCurrentUser()) this.router.navigate([""]);
  }

  async signup() {
    const value: Signup = {
      fullname: this.signupForm.value.fullname,
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      comment: this.signupForm.value.comment,
      type: UserType.contractor,
    };

    const signup = await this.auth.signup(value);
    signup.subscribe(() => {
      const config = new MatSnackBarConfig();
      config.duration = 4000;
      this.snack.open("به سامانه خوش آمدید", "ممنون", config);
      this.router.navigate(["contractor"]);
    })
  }
}
