import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { StadiumService } from '../../services/stadium.service';
import { StadiumComponent } from "../stadium/stadium.component";

@Component({
  selector: 'app-stadium-info',
  imports: [StadiumComponent],
  templateUrl: './stadium-info.component.html',
  styleUrl: './stadium-info.component.css'
})
export class StadiumInfoComponent {
    foundStadium: any;
  constructor(private activatedRoute : ActivatedRoute, private sService : StadiumService){}
  ngOnInit(){
    let teamId = this.activatedRoute.snapshot.params["id"]
    this.sService.getStadiumById(teamId).subscribe(
      (data)=>{
        this.foundStadium = data.stadium;
        console.log("found stadium : ", this.foundStadium);
      }
    )
  }
}
