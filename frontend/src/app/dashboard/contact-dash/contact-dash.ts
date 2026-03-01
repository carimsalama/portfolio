import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../core/services/contact';

@Component({
  selector: 'app-contact-dash',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-dash.html',
  styleUrl: './contact-dash.css',
})
export class ContactDash implements OnInit{

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private _contactService: ContactService) {
  }

  ngOnInit(): void {
      this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // change val.email to pattern
      location: ['', Validators.required],
        linkedin: ['', Validators.pattern('https?://.+')],
        github: ['', Validators.pattern('https?://.+')],
        whatsapp: ['', Validators.pattern('https?://.+')],
    });
    this.loadContact();
  }

  loadContact(){
    this._contactService.getContact().subscribe(res=>{      
      this.contactForm.patchValue(res)
      
    })

  }

  submit() {
    if (this.contactForm.invalid) {
      return;
    }
    this._contactService.updateContact(this.contactForm.value).subscribe(()=>{
        alert("Updated Successfully");
    })
  }

  

}
