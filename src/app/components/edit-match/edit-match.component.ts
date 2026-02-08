import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatchService } from '../../services/match.service';
@Component({
  selector: 'app-edit-match',
  imports: [FormsModule],
  templateUrl: './edit-match.component.html',
  styleUrl: './edit-match.component.css'
})
export class EditMatchComponent {
  obj: any = {}
  id!: number
  constructor(private activatedRoute: ActivatedRoute, private nService: MatchService, private router: Router) { }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"]
    this.nService.getMatchById(this.id).subscribe(
      (response) => {
        this.obj = response.foundMatch;
        console.log("obj to edit : ", this.obj);
      }
    )
  }
  editMatch() {
    this.nService.editMatch(this.obj).subscribe(
      (response) => {
        console.log("response after edit : ", response);
      }
    )
    this.router.navigate(['admin'])
  }
}
