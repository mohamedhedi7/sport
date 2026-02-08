import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  matchUrl: string = "http://localhost:3000/matches"
  constructor(private httpClient: HttpClient) { }

  getAllMatches() {
    return this.httpClient.get<{ matches: any }>(this.matchUrl)
  }

  getMatchById(id: any) {
    return this.httpClient.get<{ foundMatch: any , msg: string }>(this.matchUrl + '/' + id)
  }

  deleteMatchById(id: any) {
    return this.httpClient.delete<{ msg: string, isDeleted: boolean }>(this.matchUrl + '/' + id)
  }

  addMatch(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.matchUrl, obj)
  }

  editMatch(obj: any) {
    return this.httpClient.put<{ msg: string ,isUpdated: boolean}>(this.matchUrl, obj)
  }

  getMatchByTeamName(teamName: any) {
    return this.httpClient.get<{ matches: any , msg: string }>(this.matchUrl + '/search/' + teamName)
  }

}
