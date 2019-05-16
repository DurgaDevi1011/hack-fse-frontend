import { Component, OnInit } from '@angular/core';
import { UserAdminService } from '../services/userAdmin.service';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private item: any[];
 
  profileForm = this.fb.group({
    name:["", Validators.required],
    change_pwd:[""],
    email_address:["", Validators.required],
    password: ["", Validators.required],
    contact_number: ["", Validators.required]
  });

  constructor(private fb: FormBuilder, private userAdminService: UserAdminService) { }

  ngOnInit() {
    this.getUser();
  }
  get f() { return this.profileForm.controls; }

  setObjectValue(object){
  return  {
      name:object.name,
      change_pwd:"",
      email_address:object.email_address,
      password: object.password,
      contact_number:object.contact_number
    }
  }

  getUser() {
    var user = JSON.parse(localStorage.getItem('user'));

    this.userAdminService.getUser(user._id).subscribe(data => {
      // set items to json response
     // this.item = this.setObjectValue(data);
      
      this.profileForm.setValue(this.setObjectValue(data));
    });
  }


  updateUser() {

    if(this.profileForm.invalid){
      return;
    }
    var user = JSON.parse(localStorage.getItem('user'));

    this.userAdminService.updateUser(user._id,this.profileForm.value).subscribe(data => {
      this.getUser();
    });
  }

}
