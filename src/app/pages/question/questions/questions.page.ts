import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  constructor(private questionService: QuestionService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getQuestions();
      }
    });
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe((res) => {
      this.questionService.questionList = res.data;
    },
      (err) => {
        console.log(err);
      });
  }

  viewQuestion(id: string) {
    this.router.navigate(['/question-view/' + id]);
  }

}
