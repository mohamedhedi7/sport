import { Component } from '@angular/core';
import { editObject, getFromLs } from '../../shared/genericFunctions';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-edit-player',
  imports: [FormsModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.css'
})
export class EditPlayerComponent {
  obj: any = {}
  position!: number
  constructor(private activatedRoute: ActivatedRoute, private pService: PlayerService) { }
  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["id"]
    this.pService.getPlayerById(id).subscribe(
      (data: any) => {  
        this.obj = data.foundPlayer
      }
    )
  }
  editPlayer() {
   this.pService.editPlayer(this.obj).subscribe(
      (data: any) => {  
        console.log("response : ",data);
      }
   )
  }
}
