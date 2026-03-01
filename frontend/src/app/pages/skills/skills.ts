import { ISkills } from './../../core/models/skills.model';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SkillsService } from '../../core/services/skills';
@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit{

 skillsData:ISkills[] = [];
  constructor(private _skillsService:SkillsService, private cdr:ChangeDetectorRef){

  }
  ngOnInit(): void {
    this._skillsService.getSkills().subscribe(res=>{
      this.skillsData = res;
      this.cdr.detectChanges();

    })
    
  }


}
