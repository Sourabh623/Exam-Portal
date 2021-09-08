import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = {
    username:"",
    password:""
  };
  constructor(
    private MatSnack:MatSnackBar, 
    private login:LoginService, 
    private router: Router,
    private _toast:ToastrService
    ) {}
  ngOnInit(): void {}
  formSubmit(){
    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
      this._toast.warning("Username is required","warn")
      return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
      this._toast.warning("Password is required","warn")
      return;
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any)=>{
        console.log("Token is Generated ",data)
        //after generate token login to user here
        //set the token to the local storage
        this.login.loginUser(data.token)
        //set the also current user to the local storage
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log("User Details", user);
            //redirect admin-dashboard if role is Admin
            //redirect user-dashboard if role is Normal
            
            if(this.login.getUserRole()=="Admin"){
              //redirect the admin dashboard
              // window.location.href="/admin"
              this.router.navigate(["admin-dashboard"])
              this.login.loginServiceSubject.next(true);

            } else if(this.login.getUserRole()=="Normal") {
              //redirect the admin dashboard
              // window.location.href="/user"
              this.router.navigate(["user-dashboard"])
              this.login.loginServiceSubject.next(true);
            } else{
              this.login.logout();
              // window.location.reload();
              this.router.navigate(["login"])
            }          
            
          },
          (error)=>{
            console.log("User Not Found", error);
          }
        );


      },
      (error)=>{
        this._toast.error("Invaild Creadential","Error",{
          positionClass:'toast-bottom-right',
          progressBar:true,
          progressAnimation:'decreasing',
          closeButton:false
        })
      }
    );
  }
}