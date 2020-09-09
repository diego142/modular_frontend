import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  private userId: string;

  constructor(private eventService: EventService, private router: Router, private alertController: AlertController,
    private toastController: ToastController) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getEvents();
        this.userId = this.getUserIdStorage();
      }
    });
  }

  async toast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

  async confirmClose(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡CONFIRMAR!',
      message: '¿Esta seguro que desea cerrar este evento?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Si',
          cssClass: 'success',
          handler: () => {
            this.closeEvent(id);
          }
        }
      ]
    });

    await alert.present();
  }

  getEvents() {
    this.eventService.getEvents().subscribe((res) => {
      this.eventService.eventList = res.data;
    }, (err) => {
      this.toast('Problema al conectar la servidor.');
    });
  }

  editEvent(id: string) {
    this.router.navigate(['/event-form/' + id]);
  }

  closeEvent(id: string) {
    this.eventService.closeEvent(id).subscribe((res) => {
      const ind = this.eventService.eventList.findIndex(event => event._id === id);
      this.eventService.eventList.splice(ind, 1);
      this.toast('El evento se ha cerrado.');
    }, async (err) => {
      this.toast('No se pudo cerrar el evento, revise su conexión.');
    });
  }

  getUserIdStorage() {
    return localStorage.getItem('user_id');
  }

}
