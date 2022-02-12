import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from './userInfo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  name: string;
  userInfo: UserInfo;
  inputsEnabled: boolean;
  constructor(private activatedRoute: ActivatedRoute,) {
    this.userInfo = {
      name: this.activatedRoute.snapshot.params['name'],
      surname: "",
      password: "",
      email:"",
      username: "",
    };
    this.name = this.activatedRoute.snapshot.params['name'];
    this.inputsEnabled = false;
   }

  ngOnInit(): void {
  }


  enableInputs(){
    this.inputsEnabled = !this.inputsEnabled;
  }
  
  updateUserInfo(){
    
  }

}
