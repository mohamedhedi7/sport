import { Component } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-info',
  imports: [PlayerComponent],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.css'
})
export class PlayerInfoComponent {
  foundPlayer: any;
  constructor(private activatedRoute: ActivatedRoute, private pService: PlayerService) { }
  ngOnInit() {
    let matchId = this.activatedRoute.snapshot.params["id"]
    this.pService.getPlayerById(matchId).subscribe(
      (data: any) => {  
        this.foundPlayer = data.foundPlayer
      }
    )
  }
}
