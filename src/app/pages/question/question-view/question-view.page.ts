import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { Reply } from 'src/app/models/reply';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { Util } from 'src/app/models/util';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.page.html',
  styleUrls: ['./question-view.page.scss'],
})
export class QuestionViewPage implements OnInit {

  user = new User();
  questionId: string;
  question = new Question();
  reply = new Reply();

  constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService,
    private router: Router, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.questionId = this.activatedRoute.snapshot.params.id;
    this.getQuestion(this.questionId);
    this.user = Util.getStorageUser();
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
  }

  closeQuestion(id: string) {
    this.questionService.closeQuestion(id).subscribe((res) => {
      if (res.status) {
        this.question.open = false;
      } else {
        this.navigateAlert('¡ERROR AL CERRAR!', 'Hubo un problema al intentar obtener la informacion de esta pregunta', 'OK', 'questions');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'questions');
    });
  }

  getQuestion(id: string) {
    this.questionService.getQuestionById(id).subscribe((res) => {
      if (res.status) {
        this.question = res.data;
      } else {
        this.navigateAlert('¡ERROR AL OBTENER!', 'Hubo un problema al intentar obtener la informacion de esta pregunta', 'OK', 'questions');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'questions');
    });
  }

  async addReply() {
    this.reply.user._id = this.user._id;
    this.reply.date = new Date();
    this.reply.score = 0;

    this.questionService.addReply(this.questionId, this.reply).subscribe((res) => {
      if (res.status) {
        this.question = res.data;
        this.reply = new Reply();
      } else {
        this.navigateAlert('¡ERROR AL OBTENER!', 'Hubo un problema al intentar agregar esta pregunta', 'OK', 'questions');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'questions');

    });
  }

  removeReply(replyId: string) {
    this.questionService.removeReply(this.questionId, replyId).subscribe((res) => {
      if (res.status) {
        const ind = this.question.replys.findIndex(reply => reply._id === res.data);
        this.question.replys.splice(ind, 1);
      } else {
        this.navigateAlert('¡ERROR AL OBTENER!', 'Hubo un problema al intentar remover esta respuesta', 'OK', 'questions');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'questions');
    });
  }

  async confirmRemoveReply(replyId: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡CONFIRMAR!',
      message: '¿Estas seguro que deseas eliminar esta respuesta?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Si',
          cssClass: 'success',
          handler: () => {
            this.removeReply(replyId);
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmAddReply() {
    this.reply.reply = this.reply.reply.trim();
    if (this.reply.reply.trim()) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: '¡CONFIRMAR!',
        message: '¿Esta seguro de enviar esta respuesta?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Si',
            cssClass: 'success',
            handler: () => {
              this.addReply();
            }
          }
        ]
      });

      await alert.present();
    } else {
      const toast = await this.toastController.create({
        message: 'No puedes enviar una respuesta vacia.',
        duration: 1500
      });
      toast.present();
      this.reply.reply = '';
    }
  }

}
