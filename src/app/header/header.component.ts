import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule,TranslatePipe,TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public selectedLanguage :string ='ka';
   constructor( private translateService: TranslateService){
    this.translateService.setDefaultLang (this.selectedLanguage)
   }




   switchLanguage(language:string){
    this.translateService.use(language)
   }
}
