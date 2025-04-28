import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hometrain',
  imports: [FormsModule],
  templateUrl: './hometrain.component.html',
  styleUrl: './hometrain.component.scss'
})
export class HometrainComponent {

  constructor (private router:Router){}

  sources:any[]=[
    {value:"თბილისი", viewValue:"თბილისი"},
    {value:"ბათუმი", viewValue:"ბათუმი"}, 
    {value:"ფოთი", viewValue:"ფოთი"}
  ]; 

  todayDate = new Date().toISOString().split('T')[0]; 
  source:string=""; 
  destination:string=""; 
  date:string=""; 
  travelers:number = 1;


  onSubmit(){
    this.router.navigate(['/trains'],{
      queryParams:{
        source:this.source, 
        destination: this.destination, 
        date:this.date, 
        travelers:this.travelers,
      },

    });

  }


  
}
