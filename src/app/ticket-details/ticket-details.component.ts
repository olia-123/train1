// 
import { NgIf } from '@angular/common';
import { Component, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPrint, faFilePdf,faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [NgIf, FormsModule, CommonModule, FontAwesomeModule, TranslateModule ],
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  private http = inject(HttpClient);
  public selectedLanguage: string = 'ka';

  ticketId: any = sessionStorage.getItem("tickID");
  ticketData: any = null;
successMessage: string | null = null;




  constructor(library: FaIconLibrary ,private translateService: TranslateService) {
    library.addIcons(faPrint, faFilePdf,faCheckCircle);
  }


  
  ngOnInit(): void {
    const rawId = sessionStorage.getItem('tickID'); 
const ticketId = rawId?.split(':')[1]; 


    if (ticketId) {
      this.http.get(`https://railway.stepprojects.ge/api/tickets/checkstatus/${ticketId}`).subscribe({
        next: (data) => {
          this.ticketData = data;
             this.successMessage = "ბილეთი წარმატებით დარეგისტრირდა ✅";
        },
        error: (err) => {
          console.error('ბილეთის ინფორმაციის წამოღება ვერ მოხერხდა', err);
        }
      });
    }
  }

  @ViewChild('ticketContent', { static: false }) ticketContentRef!: ElementRef;

  // printTicket() {
  //   const printContents = this.ticketContentRef?.nativeElement.innerHTML;
  //   const originalContents = document.body.innerHTML;

  //   if (printContents) {
  //     document.body.innerHTML = printContents;
  //     window.print();
  //     document.body.innerHTML = originalContents;
  //     window.location.reload(); // optional, to reload original view
  //   } else {
  //     console.error('Could not find ticket content to print');
  //   }
  // }
printTicket() {
  window.print();
}


  downloadPDF() {
    const element = this.ticketContentRef?.nativeElement as HTMLElement | null;

    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('ticket_details.pdf');
      }).catch((error) => {
        console.error('Error generating PDF:', error);
      });
    } else {
      console.error('Could not find .ticketdet-details element.');
    }
  }
}