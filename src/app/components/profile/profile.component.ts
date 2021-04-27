import { Component, OnInit } from '@angular/core';
import { UserService } from '../../providers/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  display: boolean = false;
  profileDetails: any = {};
  profileModalCssClass: string = "profileModalCss";
  updateDetails: boolean = false;
  name: string = "";
  age: string = "";
  address: string = "";
  profileDetailsError: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  //hide show profile popup
  hideShowProfileDetails(display: any) {
    this.display = display;
    if (display == true) {
      this.userService.checkCouchDbDocumentExist("profile");
      this.userService.profileEmitter.subscribe((_element: any) => {
        this.profileDetails = _element;
        this.name = this.profileDetails.name;
        this.age = this.profileDetails.age;
        this.address = this.profileDetails.address;
      })
    }
  }

  editProfileDetails() {
    this.updateDetails = true;
  }

  saveProfileDetails() {
    if (this.name != null && this.name != "" && this.age != null && this.age != "" && this.address != null && this.address != "") {
      this.profileDetails.name = this.name;
      this.profileDetails.age = this.age;
      this.profileDetails.address = this.address;
      this.userService.updateProfileDetails(this.profileDetails);
      this.updateDetails = false;
    }
    else {
      this.profileDetailsError = true;
    }
  }
}
