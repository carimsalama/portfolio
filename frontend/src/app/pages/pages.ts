import { Navbar } from './../shared/navbar/navbar';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../shared/footer/footer';
@Component({
  selector: 'app-pages',
  imports: [RouterOutlet,Navbar,Footer],
  templateUrl: './pages.html',
  styleUrl: './pages.css',
})
export class Pages {

}
