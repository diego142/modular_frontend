import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = new User();

  constructor(private userService: UserService, private router: Router,
     public toastController: ToastController, private alertController: AlertController) { }

  ngOnInit() {
  }

  async errorLogin(head: string, subHead: string, btnTex: string, navigate: string) {
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

  async toast(head: string, msg: string) {
    const toast = await this.toastController.create({
      header: head,
      message: msg,
      color: 'primary',
      duration: 4000
    });
    toast.present();
  }

  verifyUser() {
    this.userService.getUser(this.user.email).subscribe((res) => {
      if (res.data == null) {
        this.toast('Email no registrado!', 'Intenta de nuevo o crea una cuenta para poder entrar!');
        this.router.navigate(['/login']);
        this.user.email = '';
        this.user.password = '';
      }
      else {
        if (res.data.password === this.user.password) {
          this.toast('Bienvenido al foro', '');
          this.setStorageUser(res.data._id);
          this.router.navigate(['../../home']);
        }
        else {
          this.toast('Contraseña incorrecta!', 'La contraseña que ingreso no coincide con el email');
          this.router.navigate(['/login']);
          this.user.password = '';
        }
      }
    },
      (err) => {
        this.errorLogin('ERROR DE SERVIDOR', err.message, 'OK', 'login');
      }
    );
  }

  setStorageUser(id: string) {
    localStorage.setItem('user_id', id);
  }

}
