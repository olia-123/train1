
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [TranslateModule,]
})
export class PaymentComponent implements OnInit {
  totalPrice: number = 0;
  public selectedLanguage: string = 'ka';
  formInvalid = false;

  constructor(private router: Router,private translateService: TranslateService,) { }

  ngOnInit(): void {



    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { totalPrice?: number };
  
    if (state?.totalPrice != null) {
      this.totalPrice = state.totalPrice;
      sessionStorage.setItem("totalPrice", this.totalPrice.toString()); 
      console.log('Total price received from state:', this.totalPrice);
    } else {
      const storedPrice = sessionStorage.getItem("totalPrice");
      this.totalPrice = storedPrice ? +storedPrice : 0;
      console.log('Total price from sessionStorage:', this.totalPrice);
    }
  }
  

  

  processPayment() {
    const paymentSuccessful = true;

    if (paymentSuccessful) {
      const ticketId = sessionStorage.getItem("tickID");

      if (ticketId) {
        this.router.navigate(['/ticket-details', ticketId]);
      } else {
        console.error("ბილეთის ID ვერ მოიძებნა sessionStorage-ში.");
        
      }
    } else {
    
      console.error("გადახდა ვერ განხორციელდა.");
      
    }
  }
}
  
