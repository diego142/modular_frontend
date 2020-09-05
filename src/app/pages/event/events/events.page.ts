import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  constructor(private eventService: EventService, private router: Router) {
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
    console.log(id);

  }

}
