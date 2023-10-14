import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _AuthService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  logout(){

    if(this._AuthService.logout){

      this.router.navigate(['signin']);

    }
  }

}
