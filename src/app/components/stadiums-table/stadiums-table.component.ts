import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StadiumService } from '../../services/stadium.service';

@Component({
  selector: 'app-stadiums-table',
  imports: [CommonModule],
  templateUrl: './stadiums-table.component.html',
  styleUrl: './stadiums-table.component.css'
})
export class StadiumsTableComponent implements OnInit {
  stadiums: any = [];

  constructor(private router: Router, private stadiumsService: StadiumService) { }

  ngOnInit() {
    this.stadiumsService.getAllStadiums().subscribe((data) => {
      this.stadiums = data.stadiums;
    });
  }

  goToInfo(id: number) {
    this.router.navigate([`stadiumInfo/${id}`]);
  }
  goToEdit(id: number) {
    this.router.navigate([`editStadium/${id}`]);
  }

  deleteStadium(id: number) {
    this.stadiumsService.deleteStadium(id).subscribe((response) => {
      if (response.isDeleted) {
        this.stadiumsService.getAllStadiums().subscribe((data) => {
          this.stadiums = data.stadiums;
        });
      }
    });
  }

}
