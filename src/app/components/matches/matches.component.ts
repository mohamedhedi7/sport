import { Component, EventEmitter, Output } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { NgFor } from '@angular/common';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-matches',
  imports: [ResultComponent, NgFor],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent {
  t: any = []
  constructor(private mService: MatchService) { }
  ngOnInit() {
    this.mService.getAllMatches().subscribe(
      (data: any) => {
        console.log("data from BE", data);
        this.t = data.matches
      }
    )
  }
  updateMatches(value: any) {
    this.t = value;
  }
}
