import { Component } from '@angular/core';
import { TeamComponent } from '../team/team.component';
import { NgFor } from '@angular/common';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-teams',
  imports: [TeamComponent,NgFor],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {
  t: any = []
   constructor(private tService: TeamService) { }
   ngOnInit(){
    this.tService.getAllTeams().subscribe(
      (data:any)=>{
        console.log("data from BE",data);
        this.t=data.teams;
      }
    )
   }
}
