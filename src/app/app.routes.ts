import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LinkComponent } from './link/link.component';
import { MainComponent } from './main/main.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { TrainsComponent } from './trains/trains.component';
import { HometrainComponent } from './hometrain/hometrain.component';
import { OrderComponent } from './order/order.component';
import { TicketCheckerComponent } from './ticket-checker/ticket-checker.component';


export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
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

    { path: 'check-ticket', 
        component: TicketCheckerComponent }, 

       

    {
        path:"**", 
        component:ErrorpageComponent

    }
];
