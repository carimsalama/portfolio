import { IProject } from './../../core/models/portfolio.model';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PortfolioService} from '../../core/services/portfolio';


@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],  
})
export class Projects implements OnInit {

  projects: IProject[] = [];

  constructor(private _portfolioService: PortfolioService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this._portfolioService.getProjects().subscribe({
      next: (res: IProject[]) => {
        this.projects = res.map(project => ({
          ...project,
          image: 'http://localhost:4000/' + project.image.replace(/\\/g, '/')
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading projects:', err)
    
    });
  }


}
