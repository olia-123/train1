import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule,TranslatePipe,TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hometrain',
  imports: [FormsModule,TranslateModule],
  templateUrl: './hometrain.component.html',
  styleUrl: './hometrain.component.scss'
})
export class HometrainComponent {

  public selectedLanguage :string ='ka';

  constructor (private router:Router,
     private translateService: TranslateService
  ){}

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
