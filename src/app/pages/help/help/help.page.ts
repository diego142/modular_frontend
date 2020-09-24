import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/services/branch.service';
import { Branch } from 'src/app/models/branch';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  selectText: string;
  branchList: Branch[] = new Array<Branch>();
  tagsList: Tag[] = new Array<Tag>();
  tagsFilterList: Tag[] = new Array<Tag>();

  constructor(private branchService: BranchService, private tagService: TagService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.selectText = 'Elige una opcion';
    this.getBranches();
    this.getTags();
  }

  getBranches() {
    this.branchService.getBranches().subscribe((res) => {
      this.branchList = res.data;
    }, (err) => {
      console.log(err);
    });
  }

  getTags() {
    this.tagService.getTags().subscribe((res) => {
      console.log(res);
      
      this.tagsList = res.data.filter(tag => tag.question.open === true);
      this.tagsFilterList = this.tagsList;

    }, (err) => {
      console.log(err);

    });
  }

  filter() {
    if (this.selectText === 'TODO') {
      this.tagsFilterList = this.tagsList;
    } else {
      this.tagsFilterList = this.tagsList.filter(tag => {
        for (const branch of tag.tags) {
          if (branch.name === this.selectText) {
            return tag;
          }
        }
      });
    }
  }

  viewQuestion(id: string) {
    this.router.navigate(['/question-view/' + id]);
  }

}
