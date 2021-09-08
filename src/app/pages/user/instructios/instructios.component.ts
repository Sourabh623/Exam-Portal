import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructios',
  templateUrl: './instructios.component.html',
  styleUrls: ['./instructios.component.css']
})
export class InstructiosComponent implements OnInit {
  qId=0;
  quiz=
    {
      qId:"",
      title:"",
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:''
    }
    divMarks(item:any, item1:any){
      return item/item1;
    }
  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
    private _snack:MatSnackBar,
    private _router:Router
  ) { }

  ngOnInit(): void {
  this.qId=this._route.snapshot.params.qId;
  // alert(this.qId)
  this._quiz.getSingleQuiz(this.qId).subscribe((data:any)=>{
    console.log(data)
    this.quiz = data;
  },(error)=>{
    this._snack.open("Error loading a quiz","X",{duration:3000,horizontalPosition:'right',verticalPosition:'bottom'})
  })
  }
 startTest() {
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you want be start the test!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.isConfirmed) {
    //navigate test page
    this._router.navigate(['/start-test/'+this.qId]);
    this._snack.open(
      "Test is Started","X",{
        duration:3000,
        horizontalPosition:'right',
        verticalPosition:'bottom'
      })
     }
   })
  }
}
