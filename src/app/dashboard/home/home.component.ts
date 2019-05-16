import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  noOfUser :string;
  noOfVendors:string;
  noOfDevelieryBoy:String;

  constructor(private adminService: AdminService, private authService: AuthService) { }

  ngOnInit() {

    
      this.adminService.getUser().subscribe(data => {
        this.noOfUser = data.length;       
      });
      this.adminService.getVendor().subscribe(data => {
        this.noOfVendors = data.length;       
      });
    /*  this.adminService.getDeliveryBoy().subscribe(data => {
        this.noOfDevelieryBoy = data.length;       
      });
    */

  }
  
  logout() {
    this.authService.logout();
  }

}
