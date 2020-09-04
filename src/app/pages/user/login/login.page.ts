import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = new User();

  constructor(private userService: UserService, private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  async welcomeToast() {
    const toast = await this.toastController.create({
      message: 'Bienvenido al foro!',
      color: 'primary',
      duration: 2000
    });
    toast.present();
  }

  async failedToast() {
    const toast = await this.toastController.create({
      message: 'Contraseña incorrecta!',
      color: 'primary',
      duration: 3000
    });
    toast.present();
  }

  async failedEmailToast() {
    const toast = await this.toastController.create({
      header: 'Email no registrado!',
      message: 'Intenta de nuevo o crea una cuenta para poder entrar!',
      color: 'primary',
      duration: 4000
    });
    toast.present();
  }

  verifyUser() {
    this.userService.getUser(this.user.email).subscribe((res) => {
      if (res.data == null) {
        this.failedEmailToast();
        this.router.navigate(['/login']);
        this.user.email = '';
        this.user.password = '';
      }
      else {
        if (res.data.password === this.user.password) {
          this.welcomeToast();
          this.router.navigate(['../../home']);
        }
        else {
          this.failedToast();
          this.router.navigate(['/login']);
          this.user.password = '';
        }
      }
    },
      (err) => {
        console.log(err);
      }
    );
  }

}
