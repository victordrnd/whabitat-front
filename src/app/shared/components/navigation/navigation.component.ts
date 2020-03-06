import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParamsService } from 'src/app/core/params.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  includes;
  items = [
    { title: 'Profile',link:'dashboard' },
    { title: 'Logout' },
  ];
  user;
  constructor(private router : Router,
    private paramsService : ParamsService,
    private userService : UserService) {
      this.paramsService.isFrame.subscribe(isFrame => this.includes = isFrame);
      this.userService.currentUser.subscribe(user =>{
       this.user = user
       if(!Object.keys(user).length){
         this.user = undefined
       }
      });
        
      
  }
  
  ngOnInit() {
  }

}
