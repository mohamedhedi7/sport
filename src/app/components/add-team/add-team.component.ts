import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-add-team',
  imports: [FormsModule],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css'
})
export class AddTeamComponent {
  obj: any = {}
  constructor(private tService: TeamService) { }
  addTeam() {
    this.tService.addTeam(this.obj).subscribe(
      (data) => {
        console.log("adding team : ", data.msg);
      }
    )
  }
}
