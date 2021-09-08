import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }
  
  //fetching all quizzes from the server
  public quizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }
  //fetching all categories from the server
   public categories(){
    return this._http.get(`${baseUrl}/category/`);
  }
 //adding the quiz from the server
   public addQuiz(quizData:any){
   return this._http.post(`${baseUrl}/quiz/`,quizData);
 }
 //deleting the quiz from the server
 public deleteQuiz(qId:any)
 {
   return this._http.delete(`${baseUrl}/quiz/${qId}`);
 }
 // get the single quiz
 public getSingleQuiz(qId:any)
 {
   return this._http.get(`${baseUrl}/quiz/${qId}`);
 }
//  update quiz
public updateQuiz(quiz:any)
{
  return this._http.put(`${baseUrl}/quiz/`,quiz);
}

// get the quizzes of the single cateory
public getQuizzesOfCategory(catId:any)
{
  return this._http.get(`${baseUrl}/quiz/category/${catId}`);
}
//get the active all quizzes
public getActiveQuizzes()
{
  return this._http.get(`${baseUrl}/quiz/active`);
}
//get the active all quizzes of the category
public getActiveQuizzesOfCategory(catId:any)
{
  return this._http.get(`${baseUrl}/quiz/category/active/${catId}`);
}
}
