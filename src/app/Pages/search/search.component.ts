import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { APIResponse, Customer, IStation, ITrain, Search } from '../../models/train';
import { TrainService } from '../../services/train.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DatePipe, FormsModule, CommonModule, RouterOutlet],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {


  activatedRoute = inject(ActivatedRoute);
  trainerService = inject(TrainService);
  searchData: Search = new Search();
  trainList: ITrain[] = [];
  
  router = inject(Router);
  stationList: IStation[] = [];
  fromStationId: number = 0;
  toStationId: number = 0;
  dateOfTravel: string = '';

  loggedUser: Customer = new Customer();

  constructor(){
    const localData = localStorage.getItem('MRTBS');
    if(localData != null)
    {
      this.loggedUser = JSON.parse(localData)
    }

    this.activatedRoute.params.subscribe((res:any)=>{
      this.searchData.fromStationId = res.fromStationId;
      this.searchData.toStationId = res.toStationId;
      this.searchData.dateOfTravel = res.dateOfTravel;
      this.getsearchTrains();
    })
  }
  ngOnInit(): void {
    this.loadAllStations();
  }

  loadAllStations(){
    this.trainerService.getAllStations().subscribe((res:any)=>{
       this.stationList = res.data;
    })
  }

  getsearchTrains(){
    if(this.searchData.fromStationId == 0 || this.searchData.toStationId == 0 || this.searchData.dateOfTravel == null){
      alert("Please Select Journey Details");
  }
  else {
    if(this.searchData.fromStationId == this.searchData.toStationId) {
      alert("Please give Valid Jorney Destails");
    }
    else
    {
      this.trainerService.getTrainSearch(this.searchData.fromStationId, this.searchData.toStationId, this.searchData.dateOfTravel).subscribe((res:any)=>{
        this.trainList = res.data;
      })
    }
  }
}


//Booking Part API and Function calls Start

selectedTrain?: ITrain;
bookingPassengers: any;
passanger: any = {
    "passengerName": "",
    "age": ""
}

passangerList: any[] = [];


openBookTicket(train: ITrain) {
  debugger;
  this.selectedTrain = train;
  const modal = document.getElementById("bookTicket");
  if(modal != null){
    modal.style.display = 'block'
  }
}

closeBookTicket() {
  const modal = document.getElementById("bookTicket");
  if(modal != null){
    modal.style.display = 'none'
  }
}


AddPassenger(){
  const strObj = JSON.stringify(this.passanger);
  const parsObj = JSON.parse(strObj);
  this.passangerList.push(parsObj);
}


BookTicket(){
const bookingObj = {
  "bookingId": 0,
  "trainId": this.selectedTrain?.trainId,
  "passengerId": this.loggedUser.passengerID,
  "travelDate": this.searchData.dateOfTravel,
  "bookingDate": new Date(),
  "totalSeats": 0,
  "TrainAppBookingPassengers": [
  ] as any
};
 bookingObj.TrainAppBookingPassengers = this.passangerList;
 bookingObj.totalSeats = this.passangerList.length;
 this.trainerService.BookingCustomer(bookingObj).subscribe((re:APIResponse)=>{
  if(re.result){
    alert("Ticket Book Successfully");
  }
  else{
    alert(re.message);
  }
 })
}


onRemove(sr:any){

}

}
