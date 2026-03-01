import { Routes } from '@angular/router';
import { Pages } from './pages/pages';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Projects } from './pages/projects/projects';
import { Skills } from './pages/skills/skills';
import { DashboardLayout } from './dashboard/dashboard-layout/dashboard-layout';
import { HomeDash } from './dashboard/home-dash/home-dash';
import { AboutDash } from './dashboard/about-dash/about-dash';
import { SkillsDash } from './dashboard/skills-dash/skills-dash';
import { ProjectsDash } from './dashboard/projects-dash/projects-dash';
import { ContactDash } from './dashboard/contact-dash/contact-dash';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [{
     path:'',component:Pages,children:[
    {path:'', redirectTo: "home",pathMatch:'full'},
    {path:'home', component: Home},
    {path:'about', component: About},
    {path:'contact', component: Contact},
    {path:'projects', component: Projects},
    {path:'skills', component: Skills},







]},

    {path:'dashboard',component:DashboardLayout, children:[
      { path: 'home', component: HomeDash },
      { path: 'about', component: AboutDash },
      { path: 'skills', component: SkillsDash },
      { path: 'projects', component: ProjectsDash },
      { path: 'contact', component: ContactDash },
      { path: '', redirectTo: 'home', pathMatch: 'full' }




]},
  {path:'**', component: NotFound},
    


];

