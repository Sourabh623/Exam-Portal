import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-specific-quiz',
  templateUrl: './load-specific-quiz.component.html',
  styleUrls: ['./load-specific-quiz.component.css']
})
export class LoadSpecificQuizComponent implements OnInit {

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

  constructor(
    private _route:ActivatedRoute,
    private _snack:MatSnackBar,
    private _quiz:QuizService
    ) { }

  cId=0;
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

  ngOnInit(): void {
    this._route.params.subscribe((data:any)=>{
      console.log(data.cId)
      this.cId = data.cId;
      if(this.cId!=null)
      {
        this._quiz.getActiveQuizzesOfCategory(this.cId).subscribe((data:any)=>{
          console.log(data)
          // alert("data is here")
          this.quizzes = data;
        },(error)=>{
          this._snack.open("failed loding quizzes","X",{duration:3000,horizontalPosition:'right',verticalPosition:'bottom'})  
      })
      }
    })
  }

}
