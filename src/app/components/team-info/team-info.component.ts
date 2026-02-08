import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamComponent } from '../team/team.component';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-info',
  imports: [TeamComponent],
  templateUrl: './team-info.component.html',
  styleUrl: './team-info.component.css'
})
export class TeamInfoComponent {
  foundteam: any;
  constructor(private activatedRoute : ActivatedRoute, private tService : TeamService){}
  ngOnInit(){
    let teamId = this.activatedRoute.snapshot.params["id"]
    console.log('aaaa');
    this.tService.getTeamById(teamId).subscribe(
      (data)=>{
        console.log("b jkji");
        
        this.foundteam = data.foundTeam;
        console.log("found team : ", this.foundteam);
      }
    )
  }
}
