import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { AlertController } from '@ionic/angular';

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
        }else{
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
    this.event.user = '';
    this.event.open = true;
    this.event.date = new Date();

    console.log(this.event);


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
