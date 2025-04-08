import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tripsheet } from '../model/tripsheet.model';
import { TripsheetService } from '../services/tripsheet.service';

@Component({
  selector: 'app-tripsheet',
  templateUrl: './tripsheet.component.html',
  styleUrls: ['./tripsheet.component.css']
})
export class TripsheetComponent implements OnInit {

  tripData:Tripsheet[] = [];

  constructor(private http: HttpClient, private tripSheetService: TripsheetService) {
    this.fetchData();
   }

  ngOnInit(): void {
  }

  onSubmit(postData: Tripsheet) {
    this.tripSheetService.tripSheetSave(postData).subscribe();
  }

  private fetchData() {
    this.tripSheetService.tripSheetGetData().subscribe(
      responseData => {
        this.tripData = responseData;
        console.log(this.tripData);
      }
    );
  }

}
