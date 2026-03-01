import { IContact } from './../../core/models/contact.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact';


@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit{
  contactData!:IContact;
  constructor(private _contactService:ContactService, private cdr:ChangeDetectorRef ){

  }
  ngOnInit(): void {
    this.loadContact();
   
  }
  loadContact(){
    this._contactService.getContact().subscribe({
       next: (res) => {
        this.contactData = res;
         this.cdr.detectChanges();

      },
      error: (err) => console.log(err)
    
    })

  }

}
