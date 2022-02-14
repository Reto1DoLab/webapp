import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserInfo } from './userInfo';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserInfoUpdateBody } from './user.profile.update.body';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  name: string;
  userInfo: UserInfo;
  inputsEnabled: boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private toastrService: ToastrService) {
    this.userInfo = {
      name: "",
      surname: "",
      password: "",
      email:"",
      username: "",
    };
    this.name = this.activatedRoute.snapshot.params['name'];
    this.inputsEnabled = false;
   }

  ngOnInit(): void {
    this.getProfileInfo();
  }


  enableInputs(){
    this.inputsEnabled = !this.inputsEnabled;
  }

  cancel () {
    this.enableInputs();
    this.getProfileInfo();
  }

  getProfileInfo(){
    this.authService.getUserInfo(this.name).subscribe(
        (response:UserInfo) => {
          this.userInfo = response;
          //console.log(this.movies);
        },
        (err:HttpErrorResponse) => {
          alert(err.message);
        }
      );
  }
  
  updateUserInfo(){

    let body : UserInfo ={
      name: this.userInfo.name,
      surname: this.userInfo.surname,
      username: this.userInfo.username,
      email: this.userInfo.email,
      password: this.userInfo.password,
    };
    this.authService.updateUserInfo(body).subscribe(
      (response:UserInfo) => {
        this.userInfo = response;
        this.toastrService.success('Info updated successfully!');
        this.enableInputs();

      },
      (err:HttpErrorResponse) => {
        this.toastrService.error('Info updated failed!');
        console.log(err);
      }
    );
  }

}
