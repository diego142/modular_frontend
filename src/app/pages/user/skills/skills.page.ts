import { Component, OnInit } from '@angular/core';
import { Skills} from 'src/app/models/skills';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.page.html',
  styleUrls: ['./skills.page.scss'],
})
export class SkillsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  skillsChecked( event: CustomEvent, skill: string ) {
    console.log(event.detail.checked);
    console.log(skill);
  }

  createSkills() {

  }

}
