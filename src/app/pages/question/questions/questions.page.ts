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
  }

  ionViewWillEnter() {
    this.getQuestions();
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

  showHide() {
    if(document.getElementById('showHide').style.display === 'none'){
      document.getElementById('showHide').style.display = 'block';
    }
    else if(document.getElementById('showHide').style.display === 'block'){
      document.getElementById('showHide').style.display = 'none';
    }
  }

}
