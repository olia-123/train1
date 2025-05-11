import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LinkComponent } from './link/link.component';
import { MainComponent } from './main/main.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { TrainsComponent } from './trains/trains.component';
import { HometrainComponent } from './hometrain/hometrain.component';
import { OrderComponent } from './order/order.component';
import { TicketCheckerComponent } from './ticket-checker/ticket-checker.component';
import { PaymentComponent } from './payment/payment.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component'; // ახლად შექმნილი კომპონენტი


export const routes: Routes = [
    {
        path:"",
        component:HometrainComponent
    },
    {
        path:"link",
        component:LinkComponent

    },
    {
        path:"main", 
        component:MainComponent

    },
    
    
    {
        path:"hometrains", 
        component:HometrainComponent

    },
    {
        path:"trains", 
        component:TrainsComponent

    },
      
    {
        path:"order",
        component:OrderComponent
    },

    { path: 'payment',
         component: PaymentComponent },

       
  { path: 'ticket-details/:ticketId',
     component: TicketDetailsComponent },

    { path: 'check-ticket',
        component: TicketCheckerComponent }, 

       

    {
        path:"**", 
        component:ErrorpageComponent

    }
];
