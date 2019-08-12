import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParamsService } from 'src/app/core/params.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  includes;
  constructor(private router : Router,
    private paramsService : ParamsService) {
      this.paramsService.isFrame.subscribe(isFrame => this.includes = isFrame);
  }
  
  ngOnInit() {
  }

}
