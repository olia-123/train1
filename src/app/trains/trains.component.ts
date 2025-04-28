import { NgFor } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trains',
  imports: [NgFor],
  templateUrl: './trains.component.html',
  styleUrl: './trains.component.scss'
})
export class TrainsComponent implements OnInit {
  source!:string;
  destination!:string;
  date!:string;
  travelers!:number;
  trains:any[]=[];

  constructor(private router:Router,private route:ActivatedRoute, private http:HttpClient){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.source=params['source'];
      this.destination=params['destination']; 
      this.date = params['date'];
      this.fetchTrains();
    });

    const params = this.route.snapshot.queryParamMap;
    this.travelers= +(params.get('travelers') || 0)
    console.log(this.travelers)
    
  }
  fetchTrains(){
    const url = 'https://railway.stepprojects.ge/api/departures';
    let params = new HttpParams()
    .set('source', this.source)
    .set('destination', this.destination)
    .set('date', this.date);

    this.http.get<any[]>(url, {params}).subscribe((response:any[])=>{
      console.log("response", response);
      this.trains = response.filter(train=>
        train.source === this.source &&
        train.destination === this.destination &&
        train.date === this.transformToGoergianWeekday(this.date)
      )?.[0]?.trains ||[];
      console.log(this.trains)
    },(error)=>{
      console.error("error", error)
    }
  )

  }

  
  transformToGoergianWeekday(dateString:string){
    const weekdays = ['კვირა', 'ორშაბათი', "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი " , "პარასკევი", "შაბათი"];
    const dateObj = new Date(dateString);
    const weekday = weekdays[dateObj.getDay()]
    return weekday
  }

  order(train:any, trainId:any){
    this.router.navigate(['/order'],{
      state:{
        train:train,
        trainId:trainId,
        date:this.date,
        travelers:this.travelers
    }})
  }





}
