import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ToastController } from '@ionic/angular';
import { SkillsService } from 'src/app/services/skills.service';
import { Skill } from 'src/app/models/skill';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userId: string;
  user = new User();
  skill = new Skill();

  constructor(private userService: UserService, private toastController: ToastController,
    private skillService: SkillsService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userId = this.getUserIdStorage();
    this.getUser();
    this.getSkill();
  }

  async toastMessage(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe((res) => {
      if (res.status) {
        this.user = res.data;
      } else {
        this.toastMessage('Hubo un problema al obtener la infomacion del usuario');
      }
    }, (err) => {
      this.toastMessage('Problema al conectar con el servidor.');
    });
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe((res) => {
      if (res.status) {
        this.toastMessage('Se actualizo la informacion del usuario');
      } else {
        this.toastMessage('Hubo un problema al actualizar la infomacion del usuario');
      }
    }, (err) => {
      this.toastMessage('Problema al conectar con el servidor.');
    });
  }

  getSkill() {
    this.skillService.getSkill(this.userId).subscribe((res) => {
      if (res.status) {
        this.skill = res.data;
      } else {
        this.toastMessage('Hubo un problema al obtener la infomación del usuario');
      }
    }, (err) => {
      this.toastMessage('Problema al conectar con el servidor.');
    });
  }

  editSkills() {
    this.router.navigate(['/skill-update/' + this.userId]);
  }

  enableInput(input: HTMLInputElement) {
    input.readOnly = false;
    input.style.color = 'rgb(43, 43, 43)';
  }

  getUserIdStorage() {
    return localStorage.getItem('user_id');
  }



}
