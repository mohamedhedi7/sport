import { Component } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-match-info',
  imports: [ResultComponent],
  templateUrl: './match-info.component.html',
  styleUrl: './match-info.component.css'
})
export class MatchInfoComponent {
  matchesTab: any = []
  foundMatch: any;
  constructor(private activatedRoute: ActivatedRoute, private nService: MatchService) { }
  ngOnInit() {
    let matchId = this.activatedRoute.snapshot.params["id"]
    this.nService.getMatchById(matchId).subscribe(
      (response) => {
        this.foundMatch = response.foundMatch;
        console.log("foundMatch : ", this.foundMatch);
      }
    )
  }
}      