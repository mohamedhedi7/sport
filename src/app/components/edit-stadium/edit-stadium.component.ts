import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StadiumService } from '../../services/stadium.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-edit-stadium',
  imports: [ ReactiveFormsModule, NgFor],
  templateUrl: './edit-stadium.component.html',
  styleUrl: './edit-stadium.component.css'
})
export class EditStadiumComponent {
  editStadiumForm!: FormGroup
  teams: any = [];
  id: any;
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private sService: StadiumService, private tService: TeamService) { }
  ngOnInit() {

  this.editStadiumForm = this.formBuilder.group({
    name: [''],
    country: [''],
    capacite: [''],
    teamId: ['']
  });

  this.tService.getAllTeams().subscribe(
    (data: any) => {
      this.teams = data.teams;
    }
  );

  this.id = this.activatedRoute.snapshot.params["id"];

  this.sService.getStadiumById(this.id).subscribe(
    (data: any) => {
      this.editStadiumForm.patchValue(data.stadium);
    }
  );
}
  editStadium() {
    console.log(this.editStadiumForm.value);
    this.sService.editStadium(this.editStadiumForm.value).subscribe(
      (data) => {
        console.log("editing stadium : ", data.msg);
        this.router.navigate(['/stadiums']);
      }
    )
  }
}
