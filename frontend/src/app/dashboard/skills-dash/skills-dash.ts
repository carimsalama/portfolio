import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule} from "@angular/forms";
import { ISkills } from '../../core/models/skills.model';
import { SkillsService } from '../../core/services/skills';

@Component({
  selector: 'app-skills-dash',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './skills-dash.html',
  styleUrl: './skills-dash.css',
})
export class SkillsDash {

  skillsForm!: FormGroup;
  allSkills:ISkills[] = [];
  selectedSkillId: string | null = null;
  constructor(private fb: FormBuilder,private _skillsService: SkillsService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {

   this.initForm();
    this.loadSkills();
}

initForm(){
    this.skillsForm = this.fb.group({
      category:[''],
      skillsList:this.fb.array([this.fb.control('')])
    })
  }

  loadSkills(){
    this._skillsService.getSkills().subscribe(res=>{
      this.allSkills = res;
      this.cdr.detectChanges();
    })
    
}

editSkill(skill: ISkills){
  this.selectedSkillId = skill._id!;

  this.skillsForm.patchValue({
    category: skill.category
  });

  this.skillsList.clear();

  skill.items.forEach(item=>{
    this.skillsList.push(this.fb.control(item));
  });
}

get skillsList(){
  return (this.skillsForm.get("skillsList")as FormArray);
}
removeSkill(index: number) {
    this.skillsList.removeAt(index);
  }
addSkill(){
  this.skillsList.push(this.fb.control(''))
}

deleteSkill(id:string){
  this._skillsService.deleteSkill(id)
    .subscribe(()=>{
      this.loadSkills();
    });
}

submit() {
   const formData: ISkills = {
    category: this.skillsForm.value.category,
    items: this.skillsForm.value.skillsList
  };

  if(this.selectedSkillId){
    // UPDATE
    this._skillsService.updateSkill(this.selectedSkillId, formData)
      .subscribe(()=>{
        this.loadSkills();
        this.skillsForm.reset();
        this.selectedSkillId = null;
      });
  }else{
    // CREATE
    this._skillsService.createSkill(formData)
      .subscribe(()=>{
        this.loadSkills();
        this.skillsForm.reset();
      });
  }
  }
  
}
