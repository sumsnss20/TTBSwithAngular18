import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStation, ITrain, Search } from '../../models/train';
import { TrainService } from '../../services/train.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DatePipe, FormsModule],
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

  constructor(){
    this.activatedRoute.params.subscribe((res:any)=>{
      debugger;
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

}
