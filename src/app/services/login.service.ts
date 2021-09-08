import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginServiceSubject = new Subject<Boolean>(); 

  constructor(private http:HttpClient) { }

  //generate token
  public generateToken(loginData:any)
  {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //in login user set token in LocalStorage
  public loginUser(token:any)
  {
    localStorage.setItem("token",token);
    return true;
  }
  //isLogin user is logged in or not
  public isLoggedIn()
  {
    let tokenStr = localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=="" || tokenStr==null)
    {
      return false;
    }
    else{
      return true;
    }
  }
  //Logout remove token from local storage
  public logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
  //get the token to the local storage
  public getToken()
  {
    return localStorage.getItem("token");
  }
  //set the user to the local storage
  public setUser(user:any)
  {
    localStorage.setItem("user",JSON.stringify(user));
  }
  //get the user to the local storage
  public getUser()
  {
    let userStr = localStorage.getItem("user");
    if(userStr!=null)
    {
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }
  // get the user role
  public getUserRole()
  {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  //current user: which is loggedin
  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }

}
 