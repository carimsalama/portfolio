import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray,ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from '../../core/services/portfolio';

import { IProject } from '../../core/models/portfolio.model';


@Component({
  selector: 'app-projects-dash',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './projects-dash.html',
  styleUrl: './projects-dash.css',
})
export class ProjectsDash implements OnInit {
  projects!: IProject[];
editingId: string | null = null;
    projectsForm!: FormGroup;
    selectedFile!: File;
    constructor(private fb: FormBuilder, private _portfolioService: PortfolioService, private cdr:ChangeDetectorRef) {}
ngOnInit(): void {
    this.projectsForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      liveDemo: [''],
      sourceCode: [''],
      // img: [''],
      tech: this.fb.array([this.fb.control('')]) 
    });
      this.loadProjects();

  }
  
  loadProjects(){
    this._portfolioService.getProjects().subscribe({
          next: (res: IProject[]) => {
            // تعديل مسار الصور عشان يظهر صح
            this.projects = res.map(project => ({
              ...project,
              image: 'http://localhost:4000/' + project.image.replace(/\\/g, '/')
            }));
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Error loading projects:', err)
        
        });
  }
onFileChange(event:any){
  if(event.target.files.length>0){
    const file = event.target.files[0];
    this.selectedFile = event.target.files[0];

    // this.projectsForm.patchValue({img:file})
  }
}
  get tech(): FormArray {
    return this.projectsForm.get('tech') as FormArray;
  }

  addTech() {
    this.tech.push(this.fb.control(''));
  }

 onUpdate() {

  if (this.projectsForm.invalid) return;

  const formData = new FormData();

  formData.append('title', this.projectsForm.value.title);
  formData.append('description', this.projectsForm.value.description);
  formData.append('liveDemo', this.projectsForm.value.liveDemo);
  formData.append('sourceCode', this.projectsForm.value.sourceCode);

  this.projectsForm.value.tech.forEach((tech: string) => {
    formData.append('tech[]', tech);
  });

  if (this.selectedFile) {
    formData.append('img', this.selectedFile);
  }

  if (this.editingId) {
    this._portfolioService.updateProject(this.editingId, formData)
      .subscribe(() => {
        this.afterSave();
      });
  } else {
    this._portfolioService.addProject(formData)
      .subscribe(() => {
        this.afterSave();
      });
  }
}

afterSave() {
  this.projectsForm.reset();
  this.tech.clear();
  this.tech.push(this.fb.control(''));
  this.selectedFile = null as any;
  this.editingId = null;
  this.loadProjects(); 
}
editProject(project: any) {
  this.editingId = project._id;

  this.projectsForm.patchValue({
    title: project.title,
    description: project.description,
    liveDemo: project.liveDemo,
    sourceCode: project.sourceCode,
  });

  this.tech.clear();
  project.tech.forEach((t: string) => {
    this.tech.push(this.fb.control(t));
  });
}
deleteProject(id: string) {
  if (!confirm('Are you sure?')) return;

  this._portfolioService.deleteProject(id)
    .subscribe(() => {
      this.loadProjects();
    });
}

}
