// services/football.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  url = 'http://localhost:3000/api/football';

  constructor(private http: HttpClient) { }

  searchTeams(name: string) {
    return this.http.get<{ teams: any[] }>(`${this.url}/teams/search/${name}`);
  }

  getTeamPlayers(teamId: number) {
    return this.http.get<any>(`${this.url}/teams/${teamId}/players`);
  }
}