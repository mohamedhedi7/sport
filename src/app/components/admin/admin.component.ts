import { Component } from '@angular/core';
import { MatchesTableComponent } from '../matches-table/matches-table.component';
import { PlayersTableComponent } from '../players-table/players-table.component';
import { TeamsTableComponent } from '../teams-table/teams-table.component';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [MatchesTableComponent, PlayersTableComponent, TeamsTableComponent, DatePipe, TitleCasePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  title : string = 'dashboard admin'
  nbr !: number
  actuelDate : any = new Date()
}
