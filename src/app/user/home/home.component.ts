import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/userAuth.service';
import { UserAdminService } from '../services/userAdmin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noOfUser :String;

  constructor(private useradminService: UserAdminService, private authService: UserAuthService) { }

  ngOnInit() {

    
   
        this.noOfUser = '0';       


  }
  
  logout() {
    this.authService.logout();
  }

}
