import { NgFor, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MyFilterPipe } from '../../pipes/my-filter.pipe';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-matches-table',
  imports: [NgFor, NgClass, FormsModule, MyFilterPipe],
  templateUrl: './matches-table.component.html',
  styleUrl: './matches-table.component.css'
})
export class MatchesTableComponent {
  matchesTab: any = []
  rech: string = ""
  constructor(private router: Router, private nService: MatchService) { }
  ngOnInit() {
    this.nService.getAllMatches().subscribe(
      (data) => { 
        console.log("response : ", data);
        this.matchesTab = data.matches;
      }
    )
  }
  goToInfo(matchId: any) {
    this.router.navigate(['matchInfo/' + matchId])
  }
  goToEdit(matchId: any) {
    this.router.navigate(['editMatch/' + matchId])
  }
  scoreMessage(obj: any) {
    if (obj.scoreOne > obj.scoreTwo) {
      return obj.teamOne + " is the winner";
    } else if (obj.scoreOne < obj.scoreTwo) {
      return obj.teamOne + " is the loser";
    }
    return 'match between ' + obj.teamOne + ' and ' + obj.teamTwo + ' is draw';
  }
  deleteMatch(matchId: any) {
    this.nService.deleteMatchById(matchId).subscribe(
      (data) => { 
        console.log("response : ", data);
        if (data.isDeleted) {
          this.nService.getAllMatches().subscribe(
            (result) => { 
              console.log("response : ", result);
              this.matchesTab = result.matches;
            }
          )
        }
      }   
    )
  }



}
