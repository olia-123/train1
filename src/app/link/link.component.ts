import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-link',
  imports: [TranslateModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss'
})
export class LinkComponent {
public selectedLanguage: string = 'ka';

constructor(
    private translateService: TranslateService) { }


}
