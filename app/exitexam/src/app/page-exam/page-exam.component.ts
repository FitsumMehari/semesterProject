import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ExamService } from '../exam.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-page-exam',
  templateUrl: './page-exam.component.html',
  styleUrl: './page-exam.component.css',
})
export class PageExamComponent implements OnInit {
  constructor(
    private examService: ExamService,
    private elementRef: ElementRef,
    private rendered: Renderer2
  ) {}

  exams: any = {};
  selectedExam: any = {};
  selected: any;
  isCorrectApplied: any = false;
  isIncorrectApplied: any = false;

  ngOnInit(): void {
    if (this.checkAdmin()) {
      this.getAllExams();
    } else {
      this.getExams();
    }
  }

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

  isAdmin: boolean = false;

  checkAdmin() {
    let accountType = localStorage.getItem('userType');
    if (accountType == 'admin') {
      return true;
    } else {
      return false;
    }
  }

  getExams() {
    this.examService.getExams().subscribe(
      (next) => {
        this.exams = next;
        console.log(this.exams);
      },
      (error) => {}
    );
  }

  getAllExams() {
    this.examService.getAllExams().subscribe(
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
