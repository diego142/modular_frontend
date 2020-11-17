import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { Util } from 'src/app/models/util';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.page.html',
  styleUrls: ['./event-form.page.scss'],
})
export class EventFormPage implements OnInit {

  private today = new Date().toISOString();
  id: string;
  event: Event = new Event();

  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService,
    private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.event.dateStart = new Date();
    this.id = this.activatedRoute.snapshot.params.id;
    this.getEvent(this.id);
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

  getEvent(id: string) {
    if (id !== '0') {
      this.eventService.getEventById(id).subscribe((res) => {
        if (res.status) {
          this.event = res.data;
        } else {
          this.navigateAlert('¡ERROR AL OBTENER!', 'Hubo un problema al intentar obtener la informacion de este evento', 'OK', 'events');
        }
      }, (err) => {
        this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'events');
      });
    } else {
      this.event = new Event();
    }
  }

  createEvent() {
    this.event.dateStart = new Date();
    this.event.user._id = Util.getStorageUser()._id;
    this.event.open = true;

    console.log(this.event);

    this.eventService.createEvent(this.event).subscribe((res) => {

      if (res.status) {
        this.navigateAlert('¡EVENTO CREADO!', 'Creaste un nuevo evento', 'OK', 'events');
      } else {

        this.navigateAlert('¡ERROR AL CREAR!', 'Hubo un problema al intentar crear el evento', 'OK', 'events');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'events');
    });
  }

  updateEvent() {
    this.eventService.updateEvent(this.event).subscribe((res) => {
      if (res.status) {
        this.navigateAlert('¡EVENTO MODIFICADO!', 'Modificaste este evento', 'OK', 'events');
      } else {
        this.navigateAlert('¡ERROR AL MODIFICAR!', 'Hubo un problema al modificar este evento', 'OK', 'events');
      }
    }, (err) => {
      this.navigateAlert('ERROR DE SERVIDOR', err.message, 'OK', 'events');
    });

  }
}
