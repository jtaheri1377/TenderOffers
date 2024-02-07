import { ActivatedRoute, Router } from "@angular/router";
import { Login } from "./../models/login.model";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { formatDate } from "@angular/common";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { AuthService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.auth.getCurrentUser()) this.router.navigate([""]);
  }

  login() {
    const value: Login = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.auth.login(value).subscribe((res: any) => {
      if (!res) {
        const config = new MatSnackBarConfig();
        config.duration = 4000;
        this.snack.open("به سامانه خوش آمدید", "ممنون", config);
        this.router.navigate(["contractor"]);
      }
    });
  }
}
