import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Router, NavigationEnd } from '@angular/router';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  questionList: Question[] = new Array<Question>();
  questionFilterList: Question[] = new Array<Question>();
  constructor(private questionService: QuestionService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe((res) => {
      if (res.status) {
        this.questionList = res.data;
        this.questionFilterList = this.questionList;
      }
    },
      (err) => {
        console.log(err);
      });
  }

  findQuestion(quest: string) {
      quest = quest.trim();
      const regExp = new RegExp(quest, 'i');
      this.questionFilterList = [];
  
      for (const qtn of this.questionList) {
        if (qtn.title.match(regExp)) {
          this.questionFilterList.push(qtn);
        }
      }
  }

  viewQuestion(id: string) {
    this.router.navigate(['/question-view/' + id]);
  }

  showHide() {
    if (document.getElementById('showHide').style.display === 'none') {
      document.getElementById('showHide').style.display = 'block';
    }
    else if (document.getElementById('showHide').style.display === 'block') {
      document.getElementById('showHide').style.display = 'none';
    }
  }

}
