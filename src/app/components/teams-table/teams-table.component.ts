import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getFromLs } from '../../shared/genericFunctions';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-teams-table',
  imports: [NgFor],
  templateUrl: './teams-table.component.html',
  styleUrl: './teams-table.component.css'
})
export class TeamsTableComponent {
  teamsTab: any = []
  constructor(private router: Router, private tService: TeamService) {}
  ngOnInit() {
    this.tService.getAllTeams().subscribe(
      (data) => {
        console.log(data);
        this.teamsTab = data.teams
        
      }
    )
  }
  goToInfo(matchId: any) {
    this.router.navigate(['teamInfo/' + matchId])
  }
  goToEdit(matchId: any) {
    this.router.navigate(['editTeam/' + matchId])
  }
  deleteTeam(id: any) {
    this.tService.deleteTeamById(id).subscribe(
      (data) => {
        console.log("response : ",data);
        if (data.isDeleted) {
          this.tService.getAllTeams().subscribe(
            (data) => {
              console.log("response : ",data);
              this.teamsTab = data.teams
            }
          )
        }   
      }
    );
  } 


  
}
