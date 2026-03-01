import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { SidebarDash } from '../sidebar-dash/sidebar-dash';
@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, SidebarDash],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {

}
