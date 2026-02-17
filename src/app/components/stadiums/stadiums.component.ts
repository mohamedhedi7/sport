import { Component, OnInit } from '@angular/core';
import { StadiumComponent } from '../stadium/stadium.component';
import { CommonModule } from '@angular/common';
import { StadiumService } from '../../services/stadium.service';

@Component({
  selector: 'app-stadiums',
  imports: [StadiumComponent, CommonModule],
  templateUrl: './stadiums.component.html',
  styleUrl: './stadiums.component.css'
})
export class StadiumsComponent implements OnInit {
  stadiums: any = []
  constructor(private stadiumsService: StadiumService) { }

  ngOnInit() {
    this.stadiumsService.getAllStadiums().subscribe((data) => {
      console.log(data.stadiums);
      this.stadiums = data.stadiums;
    });
  }
}
