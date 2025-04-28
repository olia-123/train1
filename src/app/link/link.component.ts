import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-link',
  imports: [],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss'
})
export class LinkComponent {
user = {
  name:"Tamar", 
  role:"Front-End Developer"
}

isLoggedIn=false;

}
