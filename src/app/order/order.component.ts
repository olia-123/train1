import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component'; 
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

interface wagon {
  id: number;
  trainId: number;
  trainNumber: number;
  name: string;
  seats: {
    seatId: string;
    number: string;
    price: number;
    isOccupied: boolean;
    vagonId: number;
  }[];
}



@Component({
  selector: 'app-order',
  imports: [FormsModule,ReactiveFormsModule,NgFor, NgIf, CommonModule , LoadingComponent,TranslateModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export  class OrderComponent  implements OnInit{
  orderform: any;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  isLoading: boolean = false; 
 public selectedLanguage: string = 'ka';

  


  constructor (private fb: FormBuilder,private http: HttpClient, private router: Router, private trabslateservice: TranslateService,){}
 
  public train:any;
  public trainId :any;
  public travelers!:number;
public reservationForm!:FormGroup;
public date!:string
ticket: any;
filteredWagons: wagon[] = [];
selectedWagon: wagon | undefined;
  selectedWagonSeats: string[] = [];
  selectedWagonClass: string | null = null;
  isDisplay: boolean = false;
  isOpen: boolean = false;

  travelersPerUL: number = 5;
  selectedSeatNums: string[] = [];
  selectedPassengerIndex: number | null = null;
  seatNum: string | undefined;
  price: number | undefined;
  totalPrice: number = 0;
  selectedSeatIds: Map<number, string> = new Map();
  ticketId: string | null = null;

  ngOnInit(): void {

    

    this.train = history.state.train;
    this.trainId = history.state.trainId;
    this.date = history.state.date;
    // this.addPassanger();
    this.travelers = +(history.state.travelers)
    console.log("train:",this.train)
    console.log("id:",this.trainId)
    console.log(typeof (this.trainId))
    console.log("trevelerebi:",this.travelers)
    console.log(typeof (this.travelers))
    console.log("dro:", this.date)
    

this.reservationForm = new FormGroup({
  trainId:new FormControl(this.trainId),
  date:new FormControl(this.date),
  email: new FormControl("",[Validators.email]),
  phoneNumber: new FormControl("",[Validators.required, Validators.pattern(/^5\d{8}$/)]),
  people: new FormArray([])
})

for (let i = 0; i < this.travelers; i++) {
  (this.reservationForm.get("people") as FormArray).push(
    new FormGroup({
      seatId: new FormControl("",[Validators.required]),
      name:new FormControl("",[Validators.required]),
      surname:new FormControl("",[Validators.required]),
      idNumber:new FormControl("",[Validators.required]),
      status:new FormControl("confirmed",[Validators.required]),
      payoutCompleted: new FormControl(true,[Validators.required]),
 
    })
  )

 
  
}
console.log(this.reservationForm.value)

  }

  get people():FormArray{
    return this.reservationForm.get("people") as FormArray;
  }
  onSubmit(){}
  

  vagonSearch() {
    this.isLoading = true;
    const url = `https://railway.stepprojects.ge/api/vagons`;
    this.http.get(url).subscribe(
      (response: any) => {
        this.ticket = response;
        this.filteredWagons = response.filter(
          (wagon: any) => wagon.trainId === this.trainId
        );
        this.isLoading = false;
      },
      (error) => {
        console.error('error', error);
        this.isLoading = false;
      }
    );
  }
 
  showWagon(wagonName:string){
    this.selectedWagon=this.filteredWagons.find((wagon:wagon)=>wagon.name===wagonName);
    this.selectedWagonSeats=this.selectedWagon ? this.selectedWagon.seats.map((seat)=>seat.number) :[];
    this.selectedWagonClass = wagonName;
  }
 
  logSeatId(seatNumber: string) {
    const selectedSeat = this.selectedWagon?.seats.find(
      (seat) => seat.number === seatNumber
    );
    if (selectedSeat) {
      if (
        this.selectedPassengerIndex !== null &&
        this.selectedPassengerIndex !== undefined
      ) {
        if(this.selectedSeatIds.has(this.selectedPassengerIndex)){
          const exestingSeatID = this.selectedSeatIds.get(
            this.selectedPassengerIndex
          );
          if(exestingSeatID){
            const previusWagon = this.filteredWagons.find((wagon)=>{
              return wagon.seats.some((seat)=>seat.seatId===exestingSeatID)
            });
            if(previusWagon){
              const previusSeat=previusWagon.seats.find((seat)=>seat.seatId===exestingSeatID);
              if(previusSeat){
                this.totalPrice-=previusSeat.price
              }
            }
          }
        }
        this.seatNum = selectedSeat.seatId;
        this.price = selectedSeat.price;
  
        console.log("არჩეული ფასი", this.price)
        console.log("ადგილის გამოტანა", selectedSeat.seatId)
 
        const passengers = this.reservationForm.get('people') as FormArray;
        const passenger = passengers.at(this.selectedPassengerIndex) as FormGroup;
 
        passenger.get('seatId')?.setValue(selectedSeat.seatId);
 
        this.selectedSeatIds.set(
          this.selectedPassengerIndex, selectedSeat.seatId
        );
        this.totalPrice+=selectedSeat.price
 
      }
    }
  }
 
  get passengers() {
    return this.reservationForm.get('passengers') as FormArray;
  }
 
  signIn(event:Event, index:number){
    event.preventDefault();
    this.selectedPassengerIndex=index;
    setTimeout(()=>{
      this.isDisplay=!this.isDisplay
    }, 100)
 
  }
 
  preventClose(event:Event){
    event.stopPropagation()
  }
 
  @HostListener("document:click", ['$event'])
  onDocumentClick(event:Event){
    if(this.isDisplay){
      let clickedInside=(event.target as HTMLElement).closest(".seat_container");
      if(!clickedInside){
        this.isDisplay=false;
        console.log("click outside", this.isDisplay)
      }
    }
  }
 
  openSeat(event:Event){
    event.preventDefault();
    if(!this.isOpen){
      this.isOpen=true;
    }
  }
  passengerIndexes():number[]{
    return Array(this.travelers).fill(0).map((_,i)=>i)

  }


  // api="https://railway.stepprojects.ge/api/tickets/register"
  // post(){
   
  //     this.http.post(this.api, this.reservationForm.value, {responseType: 'text'})
  //     .subscribe((response)=>{
  //       try{
      
  //         const ticketId = response;
  //           console.log("ticketId:", response)
          
    
  //         sessionStorage.setItem("tickID", ticketId)
  //       }catch(e){
  //         console.error("error", e)
  //       }
  //     })
 
  // }

  // consoleMe(reserve:any){
  //   console.log("form info:", reserve.value)
  //   console.log("orderforn:", this.orderform)
  // }

 

  // // goToPayment(): void {
  // //   const totalPrice = 100; 
  // // this.router.navigate(['/payment'], { queryParams: { total: totalPrice } });
    
  // // }

  // // post(): void {
  // //   this.submitOrder();
  // // }

  // submitOrder(): void {
  //   if (this.reservationForm.valid) {
  //     console.log('Form submitted:', this.reservationForm.value);
  //     // *** აქ შეგიძლიათ დაამატოთ თქვენი ლოგიკა ფორმის მონაცემების სერვერზე გასაგზავნად ***

  //     // გადამისამართება გადახდის გვერდზე
  //     this.router.navigate(['/payment'], {
  //       state: {
  //         totalPrice: this.totalPrice
  //       }
  //     });
  //   } else {
  //     console.log('Form is invalid');
  //     // *** აქ შეგიძლიათ დაამატოთ ლოგიკა მომხმარებლისთვის ვალიდაციის შეცდომების საჩვენებლად ***
  //   }
  // }
  api = "https://railway.stepprojects.ge/api/tickets/register";
  post(): void {
    this.isLoading = true;
    this.http.post(this.api, this.reservationForm.value, { responseType: 'text' })
      .subscribe((response) => {
        this.isLoading = false;
        try {
          const ticketId = response;
          console.log("ticketId:", response);
          sessionStorage.setItem("tickID", ticketId);
  
          sessionStorage.setItem("totalPrice", this.totalPrice.toString());

          this.router.navigate(['/payment'], {
            state: {
              totalPrice: this.totalPrice
            }
          });
          console.log('Total price before navigation:', this.totalPrice);
        } catch (e) {
          console.error("error", e);
        }
      }, (error) => {
        this.isLoading = false;
        console.error("HTTP error:", error);
          console.log("Error status:", error.status);
          console.log("Error body:", error.error);
        



      });
  }


}





