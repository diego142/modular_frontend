import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Response } from '../models/response';
import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { Reply } from '../models/reply';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questionList: Question[];

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Response<Question[]>> {
    return this.http.get<Response<Question[]>>(environment.URL + 'question');
  }

  getQuestionById(id: string): Observable<Response<Question>> {
    return this.http.get<Response<Question>>(environment.URL + 'question/' + id);
  }

  createQuestion(question: Question): Observable<Response<Question>> {
    return this.http.post<Response<Question>>(environment.URL + 'question', question);
  }

  updateQuestion(question: Question): Observable<Response<Question>> {
    return this.http.put<Response<Question>>(environment.URL + 'question', question);
  }

  addReply(questionId: string, reply: Reply): Observable<Response<Question>> {
    return this.http.put<Response<Question>>(environment.URL + 'question/' + questionId, reply);
  }

  
  removeReply(questionId: string, replyId: string): Observable<Response<string>> {
    return this.http.delete<Response<string>>(environment.URL + 'question/' + questionId + '/' + replyId);
  }

}
