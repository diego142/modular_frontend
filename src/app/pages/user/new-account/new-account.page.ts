import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  bandera = false;

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

  async toast(head: string, msg: string, time: number) {
    const toast = await this.toastController.create({
      header: head,
      message: msg,
      color: 'primary',
      duration: time,
    });
    toast.present();
  }

  verifyPassword(password) {
    const lenght1 = this.user.password.length;
    const lenght2 = password.length;

    if (lenght1 === lenght2) {
      if (this.user.password !== password) {
        this.bandera = false;
        this.toast('Error,', 'Las contraseñas no coinciden', 2000);
      }
      else {
        this.bandera = true;
      }
    }
    else{
      this.bandera = false;
    }


  }

  addUser() {
    this.user.active = true;
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
              this.router.navigate(['/skills']);
            }
          }]
        });
        await alert.present();
      }
      console.log(res);
      
    }, (err) => {
      this.failedAccount('ERROR DE SERVIDOR', err.message, 'OK', 'new-account');
    });
  }

}
