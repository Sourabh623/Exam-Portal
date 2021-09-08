import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _http:HttpClient) { }
  //get question of any quiz
   public getQuestionsOfAnyQuiz(quizId:any){
   return this._http.get(`${baseUrl}/question/quiz/all/${quizId}`);
  }
  //get question of any quiz
   public getQuestionsOfAnyQuizOfTest(quizId:any){
   return this._http.get(`${baseUrl}/question/quiz/${quizId}`);
  }
  public addQuestion(question:any){
    // alert("req to server")
    // console.log(question)
    return this._http.post(`${baseUrl}/question/`,question);
  }
  public deleteQuestion(questionId:any){
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }
  //evaluating quiz
  public evalauatingQuiz(questions:any){
    return this._http.post(`${baseUrl}/question/evaluating-quiz`,questions);
  }
}
