import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  imports: [FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  obj: any = {}
  constructor(private userService : UserService){}
  editProfile(){
    this.userService.editProfile(this.obj).subscribe()
  }
}
