import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

 weatherUrl: string = "http://localhost:3000/weather"
  constructor(private httpClient: HttpClient) { }

  searchWeather(obj:any) {
    return this.httpClient.post<{weather: any }>(this.weatherUrl, obj)
  } 
}
