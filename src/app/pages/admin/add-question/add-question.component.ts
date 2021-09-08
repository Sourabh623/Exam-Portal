import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {


  constructor(
    private _route: ActivatedRoute,
    private _que:QuestionsService,
    private _snack: MatSnackBar,
    private _quiz: QuizService,
    private _router:Router
  ) { }

  quiz_Id="";
  quiz_title="";
  question={
      content:"",
      option1:"",
      option2:"",
      option3:"",
      option4:"",
      answer:'',
      quiz:{
        qid:"",
        title:"",
        description: "",
        maxMarks: "",
        numberOfQuestions: "",
        active: '',
        category: {
            cId: '',
            title: "",
            description: ""
            },
      },
  };
  ngOnInit(): void {
    this.quiz_Id = this._route.snapshot.params.qId;
    this.quiz_title = this._route.snapshot.params.title;
    this.question.quiz.qid=this.quiz_Id;
    this.question.quiz.title=this.quiz_title;
    this._quiz.getSingleQuiz(this.quiz_Id).subscribe((data:any)=>{
      this.question.quiz = data;
    })
  }

  formSubmit()
  {
    if(this.question.content=="" || this.question.content==null)
    {
      this._snack.open("Content is required","X",{duration:3000, horizontalPosition:"right",verticalPosition:"bottom"})
      return;
    }

    if(this.question.option1=="" || this.question.option1==null)
    {
      this._snack.open("Option1 is required","X",{duration:3000, horizontalPosition:"right",verticalPosition:"bottom"})
      return;
    }

    if(this.question.option2=="" || this.question.option2==null)
    {
      this._snack.open("Option2 is required","X",{duration:3000, horizontalPosition:"right",verticalPosition:"bottom"})
      return;
    }

    this._que.addQuestion(this.question).subscribe((data:any)=>{
      Swal.fire("Success","Question Added","success");
      console.log(data)
      this._router.navigateByUrl('/admin-dashboard/view-questions/'+this.quiz_Id+'/'+this.quiz_title); 
    },
    (error)=>{
      Swal.fire("Error","Question is not added","error");
      console.log(error);
    });
  }

}
