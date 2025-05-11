import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from './main/main.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPrint, faFilePdf } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular4';

 constructor(library: FaIconLibrary) {
    library.addIcons(faPrint, faFilePdf);
  }
}


