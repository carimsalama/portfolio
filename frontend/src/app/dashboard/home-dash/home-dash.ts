import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder,FormArray,FormControl,FormGroup,Validator} from '@angular/forms';
import { HomeService } from '../../core/services/home';

@Component({
  selector: 'app-home-dash',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home-dash.html',
  styleUrl: './home-dash.css',
})
export class HomeDash implements OnInit{
homeForm!: FormGroup;
isEditMode = false;
selectedFile!: File;

constructor(private fb: FormBuilder, private _homeService: HomeService) {}
  ngOnInit(): void {
   this.initForm();

  this._homeService.getHome().subscribe((res: any) => {
    if (res) {
      this.isEditMode = true;
      this.patchForm(res);
    }
  });

    
  }
  initForm() {
  this.homeForm = this.fb.group({
    name:[''],
    image:[''],
    title:[''],
    description:[''],
    linkedInUrl:[''],
    cvUrl:[''],
    githubUrl:[''],
    workingWith:this.fb.array([])
  });
}
patchForm(data: any) {

  this.homeForm.patchValue({
    name: data.name,
    title: data.title,
    description: data.description,
    linkedInUrl: data.linkedin,
    cvUrl: data.cv,
    githubUrl: data.github
  });

  
  const workingArray = this.homeForm.get('workingWith') as FormArray;
  workingArray.clear();

  data.workingWith.forEach((item: string) => {
    workingArray.push(this.fb.control(item));
  });
}
onFileSelect(event: any) {
  this.selectedFile = event.target.files[0];
}

  get workingWithControls (){
    return(this.homeForm.get('workingWith') as FormArray).controls;
  }

  addWorkingWith(){
    const control = this.fb.control('');
    (this.homeForm.get('workingWith') as FormArray).push(control);
  }
  

 onUpdate() {

  const formData = new FormData();

  Object.keys(this.homeForm.value).forEach(key => {

    if (key === 'workingWith') {
      this.homeForm.value.workingWith.forEach((item: string) => {
        formData.append('workingWith', item);
      });
    } else {
      formData.append(key, this.homeForm.value[key]);
    }

  });

  if (this.selectedFile) {
    formData.append('img', this.selectedFile);
  }

  if (this.isEditMode) {
    this._homeService.updateHome(formData).subscribe();
  } else {
    this._homeService.createHome(formData).subscribe();
  }

}
}
