import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder,FormArray,FormControl,FormGroup,Validator} from '@angular/forms';
import { AboutService } from '../../core/services/about';
import { IAbout } from '../../core/models/about.model';

@Component({
  selector: 'app-about-dash',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './about-dash.html',
  styleUrls: ['./about-dash.css'],
})
export class AboutDash implements OnInit{
    aboutForm!: FormGroup;
  constructor(private fb:FormBuilder, private _aboutService:AboutService){}

  ngOnInit(): void {
    this.aboutForm = this.fb.group({
      title:[''],
      description:[''],
      experience:[''],
      projects:[''],
      problem:[''],
      technologies:[''],
    })
        this.loadAbout();

  }

   loadAbout(){
    this._aboutService.getAbout().subscribe(res => {
      this.aboutForm.patchValue(res);
    });
  }

 onUpdate(){
    if(this.aboutForm.invalid) return;

    this._aboutService.updateAbout(this.aboutForm.value)
      .subscribe(() => {
        alert("Updated Successfully");
      });
  }

}

