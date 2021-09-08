import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css']
})
export class StartTestComponent implements OnInit {

  qId=0;
  questions:any;
  marksGot=0;
  correctAnswer=0;
  attempted=0;
  isSubmit=false;
  timer:any;

  constructor(
    private _route:ActivatedRoute,
    private _locationST: LocationStrategy,
    private _questions:QuestionsService,
    private _router:Router,
    private _snack:MatSnackBar
    ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qId;
    console.log(this.qId)
    this.preventBackButton();
    this. loadQuestions();
  }

  loadQuestions(){
    this._questions.getQuestionsOfAnyQuizOfTest(this.qId).subscribe((data:any)=>{
      this.questions = data;
      this.timer = this.questions.length*1*60;
      this.startTime();
    },(error)=>{
      Swal.fire("Error","Error for loading questions of quiz");
    })
  }
  preventBackButton()
  {
    history.pushState(null, location.href);
    this._locationST.onPopState(()=>{
      history.pushState(null, location.href);
    });
  }
  submitTest(){
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to be submit the test!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed) {
      //navigate test page
        this.evalTest();
       }
     })
  }
  startTime(){
    let time = window.setInterval(()=>{
      //test time code here
      if(this.timer<=0){
        this.evalTest();
        clearInterval(time);
      }else{
        this.timer--;
      }
    },1000)
  }
  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return `${mm} min: ${ss} sec`;
  }
  evalTest(){
    //call to the server to evaluating quiz test
    this._questions.evalauatingQuiz(this.questions).subscribe((data)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your test has been submitted',
        showConfirmButton: false,
        timer: 3000
      });
    },(error)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'something went wrong',
        showConfirmButton: false,
        timer: 1500
      });
      console.log(error)
    })
    this._router.navigate(['user-dashboard']);
  }
} 
