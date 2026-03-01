import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from '../../core/services/about';
import { IAbout } from '../../core/models/about.model';
@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {

  aboutData!: IAbout;
  constructor(private _aboutService: AboutService, private cdr:ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.loadAbout();
   
  }
  loadAbout() {
    this._aboutService.getAbout().subscribe({
      next: (res) => {
        this.aboutData = res;
         this.cdr.detectChanges();

      },
      error: (err) => console.log(err)
    });
    
  }
}
