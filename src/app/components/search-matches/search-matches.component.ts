import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatchService } from '../../services/match.service';
import { NgFor, NgIf } from '@angular/common';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-search-matches',
  imports: [ReactiveFormsModule, NgFor, ResultComponent, NgIf],
  templateUrl: './search-matches.component.html',
  styleUrl: './search-matches.component.css'
})
export class SearchMatchesComponent {
  searchMatch!: FormGroup
  errorMessage: String = ""
  matches: any = []
  constructor(private formBuilder: FormBuilder, private matchService: MatchService) { }
  ngOnInit() {
    this.searchMatch = this.formBuilder.group({
      rech: [""],
    })
  }
  search() {
    console.log(this.searchMatch.value.rech);
    this.matchService.getMatchByTeamName(this.searchMatch.value.rech).subscribe((data) => {
      console.log("data : ", data);
      if (data.msg) {
        this.errorMessage = data.msg
        this.matches = []
      } else {
        this.matches = data.matches
        this.errorMessage = ""
      }
    })
  }
}
