import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

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
      }
    });
  }

  async eventClosed() {
    const toast = await this.toastController.create({
      message: 'El evento se ha cerrado.',
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
      console.log(err);

    });
  }

  editEvent(id: string) {
    this.router.navigate(['/event-form/' + id]);

  }

  closeEvent(id: string) {
    this.eventService.closeEvent(id).subscribe((res) => {
      const ind = this.eventService.eventList.findIndex(event => event._id === id);
      this.eventService.eventList.splice(ind, 1);
      this.eventClosed();
    }, (err) => {
      console.log(err);

    });
  }

  listEmpty(): boolean {
    if (this.eventService.eventList === undefined || this.eventService.eventList.length === 0) {
      return true;
    } else {
      return false;
    }
  }

}
