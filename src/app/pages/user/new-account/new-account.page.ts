import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {

  user = new User();

  constructor(private userService: UserService, public alertController: AlertController, 
    private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }


  async failedAccount(head: string, subHead: string, btnTex: string, navigate: string) {
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

  addUser() {

    this.userService.postUser(this.user).subscribe(async (res) => {
      if (res.status) {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Exito!',
          subHeader: 'te haz registrado',
          message: 'Ahora puedes iniciar sesión!.',
          buttons: [{
            text: 'Ok',
            role: 'OK',
            cssClass: 'secondary',
            handler: () => {
              this.router.navigate(['/login']);
            }
          }]
        });

        await alert.present();

      }
    }, (err) => {
      this.failedAccount('ERROR DE SERVIDOR', err.message, 'OK', 'new-account');
    });
  }


}
