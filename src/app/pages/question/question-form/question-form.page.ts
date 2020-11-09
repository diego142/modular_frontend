import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { AlertController, ToastController } from '@ionic/angular';
import { NlService } from 'src/app/services/nl.service';
import { Label } from 'src/app/models/label';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.page.html',
  styleUrls: ['./question-form.page.scss'],
})
export class QuestionFormPage implements OnInit {

  question: Question = new Question();
  questionId: string;
  userId: string;

  today = new Date().toISOString();
  show: boolean;
  labels: Label[];
  characters: string[];
  questionList: Question[];

  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService,
    private router: Router, private alertController: AlertController,
    private nlService: NlService) { }

  ngOnInit() {
    this.characters = [' ', '.', '?'];
  }

  ionViewWillEnter() {
    this.question = new Question();
    this.questionId = this.activatedRoute.snapshot.params.id;
    this.userId = this.getUserIdStorage();
    this.getQuestion(this.questionId);
    this.show = false;
    this.questionList = Array<Question>();
    this.labels = new Array<Label>();

  }

  async navigateAlert(head: string, subHead: string, btnTex: string, navigate: string) {
    const alert = await this.alertController.create({
      header: head,
      subHeader: subHead,
      buttons: [{
        text: btnTex,
        handler: () => {
          this.router.navigate(['/' + navigate + '/']);
        }
      }]
    });

    await alert.present();
  }

  createQuestion() {
    this.question.user._id = this.userId;
    this.question.date = new Date();
    this.question.open = true;

    this.questionService.createQuestion(this.question).subscribe((res) => {
      if (res.status) {
        this.router.navigate(['/tag-form/' + res.data._id], { queryParams: { labels: this.labels.map(l => l.ref) } });
      } else {
        this.navigateAlert('¡ERROR AL CREAR!', 'Hubo un problema al intentar crear esta pregunta', 'OK', 'my-questions');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'my-questions');
    });
  }

  updateQuestion() {
    this.questionService.updateQuestion(this.question).subscribe((res) => {
      if (res.status) {
        this.navigateAlert('¡PREGUNTA ACTUALIZADA!', 'Actualizaste esta pregunta', 'OK', 'my-questions');
      } else {
        this.navigateAlert('¡ERROR AL ACTULIZAR!', 'Hubo un problema al intentar actualizar estra pregunta', 'OK', 'my-questions');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'events');
    });
  }

  getQuestion(id: string) {
    if (id !== '0') {
      this.questionService.getQuestionById(id).subscribe((res) => {
        if (res.status) {
          this.question = res.data;
        } else {
          this.navigateAlert('¡ERROR AL OBTENER!', 'Hubo un problema al intentar obtener la informacion de esta pregunta', 'OK', 'my-questions');
        }
      }, (err) => {
        this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'my-questions');
      });
    } else {
      this.question = new Question();
    }
  }

  getUserIdStorage() {
    return localStorage.getItem('user_id');
  }

  getClassifications(key: string) {
    const size = this.question.title.length;
    if (size < 10) {
      this.labels = [];
      this.show = false;
      this.questionList = new Array<Question>();
    } else {
      if (this.characters.find(c => key === c)) {
        this.nlService.getClassify(this.question).subscribe((res) => {
          if (res.data.length) {

            this.labels = res.data;
            this.show = true;
          }
        }, (err) => {
          console.log(err);
        });
      }
    }
  }

  getQuestions(ref: string) {

    this.nlService.getQuestions(ref).subscribe((res) => {
      if (res.status) {
        this.questionList = new Array<Question>();

        for (let tag of res.data) {
          this.questionList.push(tag.question);
        }
      }
    }, (err) => {
      console.log(err);
    });
  }

  async viewQuestion(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Salir de la edición?',
      message: 'Si continuas se perdera el progreso de tu pregunta.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Continuar',
          cssClass: 'success',
          handler: () => {
            this.router.navigate(['/question-view/' + id]);
          }
        }
      ]
    });

    await alert.present();
  }



}
