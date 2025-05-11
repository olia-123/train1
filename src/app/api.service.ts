import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http:HttpClient) { }

  

  //api ticket
postTicketRegister():void{
  this. http.post("https://railway.stepprojects.ge/api/tickets/register",
    null
  )
}

markAllAsTouched(){
return this.http.get("")
}


getVagons(){
  return this.http.get("")
}

getConfirmedTkt(tktId:any){
  return this.http.get(`https://railway.stepprojects.ge/api/tickets/checkstatus/${tktId}`)
}

// deleteTicket(ticketId: string) {
//   return this.http.delete(`https://railway.stepprojects.ge/api/tickets/cancel/${ticketId}`);
// }

 deleteTicket(ticketId: string) {
  return this.http.delete(`https://railway.stepprojects.ge/api/tickets/cancel/${ticketId}`, {
    responseType: 'text'
  });
}
 

}
