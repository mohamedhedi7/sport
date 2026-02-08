import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generateId, getFromLs } from '../../shared/genericFunctions';
import { NgFor } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-add-player',
  imports: [FormsModule, NgFor],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent {
  obj: any = {}
  teams: any =[];
  constructor(private pService: PlayerService, private tService: TeamService) { }
  ngOnInit() {
    this.tService.getAllTeams().subscribe(
      (data: any) => {
        this.teams = data.teams;
        console.log("teams : ", this.teams);
      }
    )
  }
  addPlayer() {
    console.log(this.obj);
    this.pService.addPlayer(this.obj).subscribe(
      (data: any) => {
        console.log("response : ",data);
      }
    )
  }
  
  
}