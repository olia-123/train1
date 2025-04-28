import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http:HttpClient) { }

   

  
  //restaurant API

  getAll(){
    return this.http.get("https://restaurant.stepprojects.ge/api/Products/GetAll")
  }
  getCategories(){
    return this.http.get("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  }
  filterCatgory(id:any){
    return this.http.get(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
  }
  postCart(cartInfo:any){
    return this.http.post("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", cartInfo)
  }
  allBasket(){
    return this.http.get("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
  }


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


  
}
