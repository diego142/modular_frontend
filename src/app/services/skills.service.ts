import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';
import { Skills } from '../models/skills';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  public skillList: Skills[];
  constructor(private http: HttpClient) { }

  getSkills(){
    return this.http.get<Response<Event[]>>(environment.URL + 'skill/');
  }

  getSkill(id: string) {
    return this.http.get<Response<Event[]>>(environment.URL + 'skill/' + id);
  }

  createSkills() {
    return this.http.get<Response<Event[]>>(environment.URL + 'skill/');
  }

  addSkill(id: string, idSkill: string){
    return this.http.get<Response<Event[]>>(environment.URL + 'skill/' + id + idSkill);
  }

  updateSkill(){
    return this.http.get<Response<Event[]>>(environment.URL + 'skill/');
  }

  deleteSkill(id: string, idSkill: string){
    return this.http.get<Response<Event[]>>(environment.URL + 'skill/' + id + idSkill);
  }

}
