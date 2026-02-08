import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generateId } from '../../shared/genericFunctions';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-add-match',
  imports: [FormsModule],
  templateUrl: './add-match.component.html',
  styleUrl: './add-match.component.css'
})
export class AddMatchComponent {
  obj: any = {}
  constructor(private mService: MatchService){}
  addMatch() {
    this.mService.addMatch(this.obj).subscribe(
      (res) => {
        console.log("res from backend after adding match : ", res);
        alert(res.msg);
      }
    )
  }
}
