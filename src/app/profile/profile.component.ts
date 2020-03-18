import { Component, OnInit } from '@angular/core';
import { UserDetailService } from '../services/user-detail/user-detail.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$: Observable<User>

  constructor(
    private userDetailsService: UserDetailService
  ) { }
  

  ngOnInit(): void {

   this.user$ =  this.userDetailsService.getUserDetails()
   this.user$.subscribe(console.log)
  }

}
