import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tripsheet } from '../model/tripsheet.model';

@Injectable({
  providedIn: 'root'
})
export class TripsheetService {

  private apiUrl:string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://tksdth-ba6f5-default-rtdb.firebaseio.com/tripsheet.json';
  }

  public tripSheetSave(tripSheetData:Tripsheet):Observable<Tripsheet[]> {
    return this.http.post<Tripsheet[]>(this.apiUrl,tripSheetData);
  }

  public tripSheetGetData() {
    // return this.http.get<Tripsheet>(this.apiUrl);
    return this.http
      .get<Tripsheet>(this.apiUrl)
      .pipe(
        map(responseData => {
          const tripSheetArray:Tripsheet[] = [];
          for(const key in responseData) {
            if(responseData.hasOwnProperty(key)) {
              tripSheetArray.push({ ...responseData[key], id: key })
            }
          }
          return tripSheetArray;
        })
      );
  }

}
