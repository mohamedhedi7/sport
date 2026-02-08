import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerUrl: string = "http://localhost:3000/players"
  constructor(private httpClient: HttpClient) { }

  getAllPlayers() {
    return this.httpClient.get<{players: any}>(this.playerUrl)
  }

  getPlayerById(id: any) {
    return this.httpClient.get<{foundPlayer: any, msg: string}>(this.playerUrl + '/' + id)
  }

  deletePlayerById(id: any) {
    return this.httpClient.delete<{msg: string, isDeleted: boolean}>(this.playerUrl + '/' + id)
  }

  addPlayer(obj: any) {
    return this.httpClient.post<{msg: string}>(this.playerUrl, obj)
  }

  editPlayer(obj: any) {
    return this.httpClient.put<{msg: string, isUpdated: boolean}>(this.playerUrl, obj)
  }
  
  getPlayerByName(playerName: any) {
    return this.httpClient.get<{foundPlayer: any, msg: string}>(this.playerUrl + '/search/' + playerName)
  }
}
