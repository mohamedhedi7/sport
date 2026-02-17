import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {

   stadiumUrl: string = "http://localhost:3000/stadiums"
  constructor(private httpClient: HttpClient) { }

  addStadium(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.stadiumUrl, obj)
  }

  getAllStadiums() {
    return this.httpClient.get<{ stadiums: any }>(this.stadiumUrl)
  }

  getStadiumById(id: any) {
    return this.httpClient.get<{ stadium: any, msg: string }>(this.stadiumUrl + '/' + id)
  }

  deleteStadium(id: any) {
    return this.httpClient.delete<{ msg: string, isDeleted: boolean }>(this.stadiumUrl + '/' + id)
  }

  editStadium(obj: any) {
    return this.httpClient.put<{ msg: string, isUpdated: boolean }>(this.stadiumUrl, obj)
  }
}
