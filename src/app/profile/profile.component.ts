import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '../services/user-detail/user-detail.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userDetailsService: UserDetailService
  ) { }
  

  ngOnInit(): void {

    this.userDetailsService.getUserDetails()
    .subscribe(console.log)
  }

}
