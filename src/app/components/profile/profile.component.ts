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
  profileImageUrl: string = "";
  hideLoader: boolean = true;
  profileDetailsError: boolean = false;
  showAlert:boolean=false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  //hide show profile popup
  hideShowProfileDetails(display: any) {
    this.display = display;
    this.updateDetails = false;
    if (display == true) {
      this.hideLoader = false;
      this.userService.checkCouchDbDocumentExist("profile");
      this.userService.profileEmitter.subscribe((_element: any) => {
        this.profileDetails = _element;
        this.name = this.profileDetails.name;
        this.age = this.profileDetails.age;
        this.profileImageUrl = this.profileDetails.profile_image_url;
        this.address = this.profileDetails.address;
        this.hideLoader = true;
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
      this.showAlert=true;
      setTimeout(() => {
        this.showAlert=false;
      }, 5000);
    }
    else {
      this.profileDetailsError = true;
    }
  }
}
