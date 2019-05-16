import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/userAuth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: UserAuthService) { }

    
  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
