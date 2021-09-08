import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public user={
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender:'',
    dob:'',
  };
  
  formSubmit()
  {
    let u = JSON.stringify(this.user);
    // alert("submit")
    localStorage.setItem('user', u);
    console.log("user send data",this.user)
    if(this.user.username == '' || this.user.username == null)
    {
      // alert('username is required')
      this.snackbar.open('User Name is Required', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }
    if(this.user.password == '' || this.user.password == null)
    {
      // alert('username is required')
      this.snackbar.open('Password is Required', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }
    if(this.user.firstName == '' || this.user.firstName == null)
    {
      // alert('username is required')
      this.snackbar.open('First Name is Required', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }
    if(this.user.lastName == '' || this.user.lastName == null)
    {
      // alert('username is required')
      this.snackbar.open('Last Name is Required', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }
    if(this.user.email == '' || this.user.email == null)
    {
      // alert('username is required')
      this.snackbar.open('Email is Required', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }
    if(this.user.phone == '' || this.user.phone == null)
    {
      // alert('username is required')
      this.snackbar.open('Number is Required', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }

    if(this.user.gender == '' || this.user.gender == null)
    {
      // alert('username is required')
      this.snackbar.open('Gender is Required', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }
    if(this.user.dob == '' || this.user.dob == null)
    {
      // alert('username is required')
      this.snackbar.open('DOB is Required', 'X', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }

    //Type Script validation here

    // calling addUser function from UserService
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //success 
        console.log('success',data);
        // alert("User Created Successfully Done"); 
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Signup Successfully Done',
          showConfirmButton: false,
          timer: 3000
        })
        
      },
      (error)=>{
        //error
        console.log('error',error);
        // alert("Something went wrong");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'this username already exists try another one',
          showCloseButton: true
        })
      }
    )

  }

}
