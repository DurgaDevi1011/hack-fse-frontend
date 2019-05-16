import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/userAuth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm = this.fb.group({
    user_name: ["", Validators.required],
    password: ["", Validators.required]
  });
  message:string;

  constructor(private fb: FormBuilder, private authService: UserAuthService, private _router: Router) {

  }

  ngOnInit() {

  }

  get f() { return this.loginForm.controls; }

  login() {

    if(this.loginForm.invalid){
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(data => {
      console.log(data);
      this._router.navigate(['user/home']);
      localStorage.setItem('user', JSON.stringify(data));
    },
    error=>{
      this.message="Invalid username and password";
    });
  }
}
