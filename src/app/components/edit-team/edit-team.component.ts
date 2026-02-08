import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-edit-team',
  imports: [FormsModule],
  templateUrl: './edit-team.component.html',
  styleUrl: './edit-team.component.css'
})
export class EditTeamComponent {
  obj: any = {}
  id!: number
  constructor(private activatedRoute: ActivatedRoute, private tService: TeamService) { }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"]
    this.tService.getTeamById(this.id).subscribe(
      (data) => {
        this.obj = data.foundTeam
      }
    )
  }
  editTeam() {
    this.tService.editTeam(this.obj).subscribe(
      (data) => {
        console.log("edit team", data);
      }
    )
  }
}
