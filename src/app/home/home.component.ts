import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule,TranslatePipe,TranslateService } from '@ngx-translate/core';
import { transpileModule } from 'typescript';




@Component({
  selector: 'app-home',
  imports: [RouterModule,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


}
