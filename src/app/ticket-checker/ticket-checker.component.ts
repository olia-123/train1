
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ticket-checker',
  standalone: true,
  imports: [TranslateModule, FormsModule,NgIf],
  templateUrl: './ticket-checker.component.html',
  styleUrls: ['./ticket-checker.component.scss']
})
export class TicketCheckerComponent implements OnInit {

  public selectedLanguage: string = 'ka';
  public ticketId: string = '';
  public ticketData: any = null;
  public ticketNotFound: boolean = false;

  constructor(
    private translateService: TranslateService,
    private services: ApiService
  ) {}

  ngOnInit(): void {


  }

  getTktInfo(tktId: string): void {
    this.services.getConfirmedTkt(tktId).subscribe({
      next: (data: any) => {
          console.log("Response:", data);
           console.log("Full response:", data);
        if (data) {
          this.ticketData = data;
          this.ticketNotFound = false;
        } else {
          this.ticketData = null;
          this.ticketNotFound = true;
        }
      },
      error: () => {
        this.ticketData = null;
        this.ticketNotFound = true;
      }
    });
  }


deleteTkt(tktId: string): void {
  if (confirm("დარწმუნებული ხარ, რომ გინდა ბილეთის წაშლა?")) {
    this.services.deleteTicket(tktId).subscribe({
      next: (res: string) => {
        alert(res);
        this.ticketData = null;
        this.ticketId = '';
        // this.router.navigate(['/']); // აქ ხდება გადამისამართება მთავარ გვერდზე
      },
      error: (err) => {
        console.error("წაშლის შეცდომა:", err);
        alert("ბილეთის წაშლა ვერ მოხერხდა");
      }
    });
  }
}


}