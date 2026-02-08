import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  weatherForm!: FormGroup
  obj: any = {}
  constructor(private formBuilder: FormBuilder, private weatherService: WeatherService) { }
  ngOnInit() {
    this.weatherForm = this.formBuilder.group({
      city: ["", [Validators.required]],
    })
  }
  search() {
    this.weatherService.searchWeather(this.weatherForm.value).subscribe(
      (data) => {
        console.log(data);
        
        console.log(data.weather);
        this.obj=data.weather
      }
    );
  }
}
