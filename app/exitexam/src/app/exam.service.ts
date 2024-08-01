import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private http: HttpClient) {}

  getExams(fieldofstudy: any) {
    const url = environment.apiURL + 'exam/:' + fieldofstudy;

    // const url = `http://localhost:3000/exam/:${fieldofstudy}`;
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(url, httpOptions);
  }

  getAllExams(userId: any) {
    const url = environment.apiURL + 'exam/:' + userId;

    // const url = `http://localhost:3000/exam/:${userId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
      }),
    };

    return this.http.get(url, httpOptions);
  }

  deleteExam(exam: any) {
    const url = environment.apiURL + 'exam/:' + exam._id;

    // const url = `http://localhost:3000/exam/:${exam._id}`;

    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete(url, httpOptions);
  }


  // The following code needs revision as to what the getItem('id) is referrring to on the api

  addExam(exam: any) {
    const url = environment.apiURL + 'exam/:';

    // const url = `http://localhost:3000/exam/:${localStorage.getItem('id')}`;

    const httpOptions = {
      headers: new HttpHeaders({
        token: `token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(url, exam, httpOptions);
  }
}
