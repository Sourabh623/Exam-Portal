import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[
    {
      qId:"",
      title:"",
      description:"",
      maxMarks:"",
      numberOfQuestions: "",
      active:'',
      category:{
        title:""
      }
    
    }
  ]

  constructor(private quiz:QuizService) { }

  ngOnInit(): void {
    this.quiz.quizzes().subscribe(
      (data:any)=>{
        //successfully fetch data to the server
        console.log(data);
        this.quizzes = data;
      },
      (error)=>{
        //server side error
        console.log(error);
        Swal.fire("Server Error", "OOPS","error");
      }
    );
  }

  //delete quiz
  deteleQuiz(qId: any)
  {
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
      //alert(qId)
      this.quiz.deleteQuiz(qId).subscribe(()=>{
      this.quizzes = this.quizzes.filter((quiz)=> quiz.qId != qId)     
      Swal.fire(
        'Deleted!',
        'Your quiz has been deleted.',
        'success'
      )
    },(error)=>{
      Swal.fire("Error","Quiz is not deleted", "error")
      console.log(error)
    });

  }
})
}

myFunction() {
  this.quizzes.reverse();
}

}
