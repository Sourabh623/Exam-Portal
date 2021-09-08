import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _router:Router,private _route: ActivatedRoute, private _quiz: QuizService, private _cat:CategoryService,
    private _snack:MatSnackBar) { }

  qId = 0;
  categories=[{cId:"",title:"",description:""}];
  quizData = {
    title:"",
    description:"",
    maxMarks:"",
    numberOfQuestions:"",
    active:"",
    category:{
     cId:'',
     title:'',
     description:''
   }
  }
  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    //alert(this.qId)
    this._quiz.getSingleQuiz(this.qId).subscribe(
      (data:any)=>{
        //success msg
        this.quizData = data;
        console.log(this.quizData)
        //alert("success")
      },
      (error)=>{
        //error msg
        this._snack.open("Error","X",{
          duration:3000,
          horizontalPosition:"right",
        })
      }
    );
    
    this._cat.categories().subscribe((data:any)=>{
      this.categories = data;
    });
  }
  
  // update form
  public updateForm()
  {
      this._quiz.updateQuiz(this.quizData).subscribe((data)=>{
      //updated successfully
      Swal.fire("Success","Quiz is Updated","success");
      this._router.navigate(['/admin-dashboard/quizzes']); 
    },(error)=>{
      Swal.fire("Error","Quiz is not Updated","error");
    });
  }
}
