import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { StadiumService } from '../../services/stadium.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-add-stadium',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-stadium.component.html',
  styleUrl: './add-stadium.component.css'
})
export class AddStadiumComponent {
  addStadiumForm!: FormGroup
  obj: any = {}
  teams: any = [];
  constructor(private formBuilder: FormBuilder, private router: Router, private sService: StadiumService, private tService: TeamService) { }
  ngOnInit() {
    this.tService.getAllTeams().subscribe(
      (data: any) => {
        this.teams = data.teams;
        console.log("teams : ", this.teams);
      }
    )
    this.addStadiumForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      country: ["", [Validators.required]],
      capacite: ["", [Validators.required]],
      teamId: [""]
    })
  }
  addStadium() {
    console.log(this.addStadiumForm.value);
    this.sService.addStadium(this.addStadiumForm.value).subscribe(
      (data) => {
        console.log("adding team : ", data.msg);
      }
    )
  }
}
