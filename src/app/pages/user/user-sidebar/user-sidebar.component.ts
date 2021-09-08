import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categories = [{ cId: "", title: '', description: '' }];

  quizzes=[
    {
      qId:"",
      title:"",
      description:"",
      maxMarks:"",
      numberOfQuestions: "",
      active:'',
      category:{
        cId:'',
        title:"",
        description:""
      }
    }
  ];


  constructor(
    private _cat:CategoryService, 
    private _route:ActivatedRoute,
    private _snack:MatSnackBar,
    private _quiz:QuizService
    ) { }

  ngOnInit(): void {
    this._cat.categories().subscribe((data:any)=>{
      this.categories=data;
    },
    (error)=>{
      this._snack.open("Error loading category","X",{
        duration:3000,
        horizontalPosition:'right',
        verticalPosition:'bottom'
      })
    })
  }
  allQuiz(){
      
  }

}
