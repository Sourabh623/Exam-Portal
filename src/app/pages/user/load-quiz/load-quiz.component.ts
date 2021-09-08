import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';


@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {


  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

  catId='';
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
    private _route:ActivatedRoute,
    private _snack:MatSnackBar,
    private _quiz:QuizService
  ) { }

  ngOnInit(): void {
    //load all quizzes
    this._quiz.getActiveQuizzes().subscribe((data:any)=>{
      this.quizzes = data;
      console.log(data)
    },(error)=>{
      this._snack.open("failed loding quizzes","X",{duration:3000,horizontalPosition:'right',verticalPosition:'bottom'})  
  })
  }

}