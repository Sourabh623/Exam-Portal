import { NgLocaleLocalization } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title:"",
    description:"",
  }

  constructor(private _category:CategoryService, private _snack:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit()
  {
    if(this.category.title.trim()=='' || this.category.title==null)
    {
      this._snack.open("Title is required","X",{
        duration: 3000,
        horizontalPosition:'right',
        verticalPosition: 'top'
      })
      return;
    }

    if(this.category.description.trim()=='' || this.category.description==null)
    {
      this._snack.open("Description is required","X",{
        duration: 3000,
        horizontalPosition:'right',
        verticalPosition: 'top'
      })
      return;
    }

    //everything fine
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        //success addede category 
        this.category.title = "";
        this.category.description = "";
        Swal.fire("Success!!","Category Added","success");
        
      },
      (error)=>{
        Swal.fire("OOPS","Server Error","error");
      }
    )


  }

}
