import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router, private alertController: AlertController) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const id = localStorage.getItem('user_id');
    const response = this.getUser(id);

    return response.then(resolve => {
      if (resolve === true) {
        if (next.url[0].path === 'login') {
          return this.router.navigate(['/home/']);
        } else {
          return true;
        }
      } else {
        if (next.url[0].path === 'login') {
          return true;
        } else {
          this.alert();
          return this.router.navigate(['/login/']);
        }
      }
    });

  }

  async getUser(id: string) {
    return new Promise((resolve, reject) => {
      this.userService.getUserById(id).subscribe((res) => {
        if (res.status && res.data !== null) {
          console.log('if', res);

          resolve(true);
        } else {
          console.log('else', res);

          resolve(false);
        }
      }, (err) => {
        console.log('err', err);

        reject(false);
      });
    });
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Lo sentimos.',
      subHeader: 'Necesitas iniciar sesion para poder ver esto.',
      buttons: ['OK']
    });

    await alert.present();
    localStorage.removeItem('user_id');

  }

}
