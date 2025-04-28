import { NgFor, NgIf } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-order',
  imports: [NgIf,NgFor,FormsModule,ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export  class OrderComponent  implements OnInit{

//   train:any
//   trainId :any
// orderForm: FormGroup;
//   seatId: any;
// passanger: any;
// apiUrl: string | undefined;


// ngOnInit():void{
//   this.train=history.state.train
//   this.trainId=history.state.trainId
// }


// apiUrl ='https://railway.stepprojects.ge/api/tickets/register';
// onSubmit(){
//   if(this.orderForm.valid){
//     const formData=this.orderForm.value;
//     const ticketData ={
//       trainId:this.trainId,
//       date:new Date().toISOString(),
//       email:formData.email,
//       phoneNumber:formData.phoneNumber,
//       people:formData.passangers.map((passanger :any) => ({
//         seatId:this.seatId,
//         name:passanger.name,
//         surname:passanger.surname,
// idNumber:passanger.idNumber,
// status:'confirmd',
// payoutcomplete:true

//       }))
//     };
//     this.postTicketRegister(ticketData);
//   } else {
//     console.log('ფორმა არასწორია');
//     this.markAllAsTouched();
//   }
//     }
//   markAllAsTouched() {
//     throw new Error('Method not implemented.');
//   }
//   postTicketRegister(ticketData: { trainId: any; date: string; email: any; phoneNumber: any; people: any; }) {
//     throw new Error('Method not implemented.');
//   }

//   constructor(private http: HttpClient, private router: Router) { }

// postTicketRegister(ticketData: any) {
//   this.http.post(this.apiUrl, ticketData).subscribe(
//     (response: any) => { JSON.stringify(response);
//       console.log('ბილეთი წარმატებით დარეგისტრირდა!', response);

   
//       if (response && response.bookingId) {
//         sessionStorage.setItem('bookingId', JSON.stringify(response.bookingId));
//       }
//       sessionStorage.setItem('trainId', JSON.stringify(this.trainId));

//       this.router.navigate(['/confirmation']);
//     },
//     (error) => {
//       console.error('ბილეთის რეგისტრაციის შეცდომა:', error);
    
//     }
//   );
// }



orderForm: FormGroup;
  train: any;
  trainId: any;
  private apiUrl: string = 'https://railway.stepprojects.ge/api/tickets/register'; 
  trains: any[] = [];
  selectedTrainId: number | null = null;
  filterWagons: any[] = [];
  selectedWagonSeats: any;
  selectedWagon: any;
  // ticket: any[];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      passangers: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.train = history.state.train;
    this.trainId = history.state.trainId;
    this.addPassanger();
  }

  

  passangers(): FormArray {
    return this.orderForm.get('passangers') as FormArray;
  }

  newPassanger(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      idNumber: ['', Validators.required],
      seatId: ['']
    });
  }

  addPassanger() {
    this.passangers().push(this.newPassanger());
  }

  removePassanger(index: number) {
    this.passangers().removeAt(index);
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const formData = this.orderForm.value;

      const ticketData = {
        trainId: this.trainId,
        date: new Date().toISOString(),
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        people: formData.passangers.map((passanger: any) => ({
          seatId: passanger.seatId || this.generateSeatId(),
          name: passanger.name,
          surname: passanger.surname,
          idNumber: passanger.idNumber,
          status: 'confirmed',
          payoutcomplete: true
        }))
      };

      this.postTicketRegister(ticketData);

    } else {
      console.log('ფორმა არასწორია');
      this.markAllAsTouched();
    }
  }

  markAllAsTouched() {
    Object.keys(this.orderForm.controls).forEach(key => {
      this.orderForm.get(key)?.markAsTouched();
    });

    this.passangers().controls.forEach(control => {
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          control.get(nestedKey)?.markAsTouched();
        });
      }
    });
  }

  postTicketRegister(ticketData: any) {
    this.http.post(this.apiUrl, ticketData).subscribe(
      (response: any) => {
        console.log('ბილეთი წარმატებით დარეგისტრირდა!', response);
        if (response?.bookingId) {
          sessionStorage.setItem('bookingId', JSON.stringify(response.bookingId));
        }
        sessionStorage.setItem('trainId', JSON.stringify(this.trainId));
        this.router.navigate(['/confirmation']);
      },
      (error) => {
        console.error('ბილეთის რეგისტრაციის შეცდომა:', error);
      }
    );
  }

  generateSeatId(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }


  // showWagon(wagonName: string) {
  //   this.selectedWagon = this.filterWagons.find((wagon: Wagon) => wagon.name === wagonName);
  //   this.selectedWagonSeats = this.selectedWagon ? this.selectedWagon.seats.map(seat => seat) : [];
  //   this.selectedWagonClass = wagonName;
  // }

  // vagonSearch() {
  //   const url = `http://railway.stepprojects.ge/api/vagons`;
  //   this.http.get<any[]>(url).subscribe((response: any[]) => {
  //     this.ticket = response;
  //     this.filterWagons = response.filter((wagon: any) => wagon.trainId === this.selectedTrainId);

  //   }, (error) => {
  //     console.error('ვაგონების მოძიების შეცდომა:', error);
      
      
      
  //   });
  // }

}
