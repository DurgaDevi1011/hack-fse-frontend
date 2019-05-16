import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  message: string;
  mobnumPattern: string;
  submitted = false;
  sumessage: string;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";

    this.register = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(this.mobnumPattern)]]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }
  get f() { return this.register.controls; }

  registerForm(formData: any, formDirective: FormGroupDirective) {
    this.submitted = true;

    if (this.register.invalid) {
      return;
    }

    this.authService.register(this.register.value).subscribe(data => {
      this.submitted = false;
      this.sumessage = "Successfully Registered";
      formDirective.resetForm();
      this.register.reset();
  
    },
      error => {
        this.message = "Invalid username and password";
      });
  }

}
