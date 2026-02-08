import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

   teamUrl: string = "http://localhost:3000/teams"
  constructor(private httpClient: HttpClient) { }

  getAllTeams() {
    return this.httpClient.get<{teams: any}>(this.teamUrl)
  }

  getTeamById(id: any) {
    return this.httpClient.get<{foundTeam: any, msg: string}>(this.teamUrl + '/' + id)
  }

  deleteTeamById(id: any) {
    return this.httpClient.delete<{msg: string, isDeleted: boolean}>(this.teamUrl + '/' + id)
  }

  addTeam(obj: any) {
    return this.httpClient.post<{msg: string}>(this.teamUrl, obj)
  }

  editTeam(obj: any) {
    return this.httpClient.put<{msg: string, isUpdated: boolean}>(this.teamUrl, obj)
  }
}
