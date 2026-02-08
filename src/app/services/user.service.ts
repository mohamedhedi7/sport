import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = "http://localhost:3000/users"
  constructor(private httpClient: HttpClient) { }

  login(user: any) {
    return this.httpClient.post<{msg: string, user: any}>(this.userUrl + "/login", user)
  }

  signUp(user: any, img: File) {
    let fData = new FormData();
    fData.append("img", img);
    fData.append("firstName", user.firstName);
    fData.append("lastName", user.lastName);
    fData.append("email", user.email);
    fData.append("pwd", user.pwd);
    fData.append("role", user.role);
    return this.httpClient.post<{msg: string}>(this.userUrl + "/signup", fData)
  }

  editProfile(user: any) {
    return this.httpClient.put(this.userUrl, user)
  }

}
