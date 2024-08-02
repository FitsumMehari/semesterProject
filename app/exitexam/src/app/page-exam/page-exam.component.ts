import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ExamService } from '../exam.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ManagetokenService } from '../managetoken.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-page-exam',
  templateUrl: './page-exam.component.html',
  styleUrl: './page-exam.component.css',
})
export class PageExamComponent implements OnInit {
  constructor(
    private examService: ExamService,
    private elementRef: ElementRef,
    private rendered: Renderer2,
    private tokenService: ManagetokenService
  ) {}

  exams: any = {};
  selectedExam: any = {};
  selected: any;
  isCorrectApplied: any = false;
  isIncorrectApplied: any = false;

  ngOnInit(): void {
    // this.subscription = this.tokenService.currentUser.subscribe(
    //   (loggedUser) => (this.user = loggedUser)
    // );

    let token = localStorage.getItem('token');
    if (!!token) {
      this.user = jwtDecode(token);
    } else {
      this.subscription = this.tokenService.currentUser.subscribe(
        (loggedUser) => (this.user = loggedUser)
      );
    }
    if (this.user.isAdmin) {
      this.getAllExams();
    } else {
      this.getExams(this.user.fieldofstudy);
    }
  }

  subscription: Subscription | undefined;

  user: any = {};

  newExam: any = {
    examTitle: '',
    fieldofstudy: '',
    questions: [],
  };
  newQuestions: any = [];
  newQuestion: any = {
    question: '',
    choices: {
      a: '',
      b: '',
      c: '',
      d: '',
    },
    answer: '',
  };

  getExams(fieldofstudy:any) {
    this.examService.getExams(fieldofstudy).subscribe(
      (next) => {
        this.exams = next;
      },
      (error) => {}
    );
  }

  getAllExams() {
    this.examService.getAllExams(this.user.id).subscribe(
      (next) => {
        // this.Exams = Object.assign({}, next);
        this.exams = next;
      },
      (error) => {}
    );
  }

  deleteExam(id: any) {
    this.selectExam(id);
    let confirmed = confirm(
      `Are you sure to delete ${this.selectedExam.title}`
    );
    if (confirmed) {
      this.examService.deleteExam(this.selectedExam).subscribe(
        (next) => {
          this.getAllExams();
        },
        (error) => {}
      );
    } else {
      this.getAllExams();
    }
  }

  select(choice: any, answer: any, id: any, answerId: any) {
    let isCorrectApplied = false;
    let isIncorrectApplied = false;
    if (choice == answer) {
      if (this.isCorrectApplied) {
        this.rendered.removeClass(document.getElementById(id), 'correct');
        this.isCorrectApplied = false;
      } else {
        this.rendered.addClass(document.getElementById(id), 'correct');
        this.isCorrectApplied = true;
      }
    } else {
      if (this.isIncorrectApplied) {
        this.rendered.removeClass(document.getElementById(id), 'incorrect');
        this.isIncorrectApplied = false;
      } else {
        this.rendered.addClass(document.getElementById(id), 'incorrect');
        this.isIncorrectApplied = true;
      }
    }
    this.rendered.removeClass(document.getElementById(answerId), 'hidden');
  }

  selectExam(id: any) {
    this.exams.forEach((exam: any) => {
      if (exam._id == id) {
        this.selectedExam = exam;
      }
    });
  }

  addQuestion(form: NgForm) {
    this.newQuestions.push({ ...this.newQuestion });
    this.newQuestion = {
      question: '',
      choices: {
        a: '',
        b: '',
        c: '',
        d: '',
      },
      answer: '',
    };
  }

  saveExam(form: NgForm) {
    this.newExam.questions = this.newQuestions;
    this.examService.addExam(this.newExam).subscribe(
      (next) => {
        alert('Successful');
        this.newQuestions = [];
        this.getAllExams();
      },
      (error) => {}
    );
  }
}
