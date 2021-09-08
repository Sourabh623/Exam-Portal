import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  constructor(
    private _route:ActivatedRoute, 
    private _question:QuestionsService,
    private _snack:MatSnackBar
    ) { }

  qId="";
  title="";
  questions = [
    {
      questionId:"",
      content:"",
      option1:"",
      option2:"",
      option3:"",
      option4:"",
      answer:'',
    }
  ];

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qId;
    this.title = this._route.snapshot.params.title;
    this._question.getQuestionsOfAnyQuiz(this.qId).subscribe(
      (data:any)=>{
        //successfully fetch data to the server
        console.log(data);
        this.questions = data;
      },
      (error)=>{
        //server side error
        console.log(error);
        Swal.fire("Server Error", "OOPS","error");
      }
    );
  }

  myAscendingList() {
    this.questions.sort();
  }
  myDescendingList() {
    this.questions.reverse();
  }
  deleteQuestion(questionId:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
      this._question.deleteQuestion(questionId).subscribe(()=>{
      this.questions = this.questions.filter((question)=> question.questionId != questionId)     
      this._snack.open(
        "Question Deleted","X",{
          duration:3000,
          horizontalPosition:'right',
          verticalPosition:'top'
        }
      )
    },(error)=>{
      Swal.fire("Error","Question is not deleted", "error")
      console.log(error)
    })
  }
})
}


}
