import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stadium',
  imports: [],
  templateUrl: './stadium.component.html',
  styleUrl: './stadium.component.css'
})
export class StadiumComponent {
  @Input() stadium:any;
  ngOnInit() {
    console.log(this.stadium);
  }
}
