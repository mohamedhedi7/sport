import { NgStyle, NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  imports: [NgStyle, NgClass, NgIf],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  @Input() obj: any = {};
  @Output() matchesToSend: EventEmitter<any> = new EventEmitter();
  path: string = "";
  t: any = []
  constructor(private nService: MatchService, private router: Router) { }
  ngOnInit() {
    this.path=this.router.url
  }
  scoreColor(a: number, b: number) {
    if (a > b) {
      return 'green'
    } else if (a < b) {
      return 'red'
    }
    return 'blue'
  }
  scoreResult(a: number, b: number) {
    if (a > b) {
      return 'Win'
    } else if (a < b) {
      return 'Lose'
    }
    return 'Draw'
  }
  deleteMatch() {
    this.nService.deleteMatchById(this.obj._id).subscribe(
      (data) => {
        console.log("response : ", data);
        if (data.isDeleted) {
          this.nService.getAllMatches().subscribe(
            (result) => {
              console.log("response : ", result);
              this.matchesToSend.emit(result.matches);
            }
          )
        }
      }
    )
  }
}
