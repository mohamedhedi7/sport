import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-players',
  imports: [NgFor,PlayerComponent],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {
  t: any = []
  constructor(private pService: PlayerService){}
  ngOnInit(){
    this.pService.getAllPlayers().subscribe(
      (data:any)=>{
        console.log("data from BE",data);
        this.t=data.players;
      }
    )
  }
}
