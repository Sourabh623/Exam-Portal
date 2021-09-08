import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[{cid:"",title:""}];
  quizData = {
    title:"",
    description:"",
    maxMarks:"",
    numberOfQuestions:"",
    active:true,
    category:{
     cid:'',
     title:'',
     decription:''
   }
  }

  constructor(private _router:Router, private quiz:QuizService, private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.quiz.categories().subscribe((data:any)=>{
      console.log(data)
      this.categories = data;
    },
    (error)=>{
      console.log(error)
      Swal.fire("OOPS","Server Error","error");
    });
  }

  //add the quiz function here
  addQuiz()
  {
    //validation
    if(this.quizData.title.trim()=="" || this.quizData.title==null){
      this._snack.open('Title is required',"X",{
        duration:3000,
        horizontalPosition:'right',
        verticalPosition:'bottom'
      });
      return;
    }

    // console.log(this.quizData);
    this.quiz.addQuiz(this.quizData).subscribe(
      (data)=>{
        //succesfully quiz added
        console.log("Quiz Data",data)
        Swal.fire("Success","Quiz is added","success");
        this.quizData = {
          title:"",
          description:"",
          maxMarks:"",
          numberOfQuestions:"",
          active:true,
          category:{
           cid:'',
           title:'',
           decription:''
         }
        }
        this._router.navigate(['/admin-dashboard/quizzes']); 
      },
      (error)=>{
        //unsuccesfully quiz added or server side error
        console.log("Quiz Data",error)
        Swal.fire("Error","Server Error","error");
      }
    );
  }

}
