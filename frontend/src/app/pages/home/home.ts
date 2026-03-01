import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService} from '../../core/services/home';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  homeData: any;

  constructor(private homeService: HomeService,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.homeService.getHome().subscribe(res => {
      this.homeData = res;
       this.cdr.detectChanges();
    });
    
  }

}