import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { getFromLs } from '../../shared/genericFunctions';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-players-table',
  imports: [NgFor],
  templateUrl: './players-table.component.html',
  styleUrl: './players-table.component.css'
})
export class PlayersTableComponent {
  playersTab: any = []
  constructor(private router: Router, private pService: PlayerService) {}
  ngOnInit() {
    this.pService.getAllPlayers().subscribe((data: any) => {
      console.log("players table : ",data);
      this.playersTab  = data.players;
      console.log(this.playersTab[0].name);
      
    });
  }
  goToInfo(matchId: any) {
    this.router.navigate(['playerInfo/' + matchId])
  }
  goToEdit(matchId: any) {
    this.router.navigate(['editPlayer/' + matchId])
  }
  deletePlayer(id: any) {
      this.pService.deletePlayerById(id).subscribe((data: any) => {
        console.log("response : ",data);
        if (data.isDeleted) {
          this.pService.getAllPlayers().subscribe((data: any) => {
            console.log("response : ",data);
            this.playersTab = data.players;
          })
        }
      });
  }
} 
