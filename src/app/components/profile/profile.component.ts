import { Component, OnInit } from '@angular/core';
import { UserService} from '../../providers/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  display:boolean=false;
  profileDetails:any={};
  profileModalCssClass: string = "profileModalCss";
  file: File | undefined ;
  shortLink: string = ""; 
  updateDetails:boolean=false;
  name:string="";
  age:string="";
  address:string="";
  profileImageUrl:string="";
  profileDetailsError:boolean=false;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  //hide show profile popup
  hideShowProfileDetails(display:any)
  {
    this.display=display;
    if(display==true)
    {
      this.userService.checkCouchDbDocExist("profile");
      this.userService.profileEmitter.subscribe((_element: any)=>{
        this.profileDetails=_element;
      })
    }
  }

  editProfileDetails()
  {
    this.updateDetails=true;
    this.name=this.profileDetails.name;
    this.age=this.profileDetails.age;
    this.address=this.profileDetails.address;
  }

  saveProfileDetails()
  {
    if(this.name!=null && this.name!="" && this.age!=null && this.age!="" && this.address!=null && this.address!="")
    {
      this.profileDetails.name=this.name;
      this.profileDetails.age=this.age;
      this.profileDetails.address=this.address;
      this.userService.updateProfileDetails(this.profileDetails);
      this.updateDetails=false;
    }
    else
    {
      this.profileDetailsError=true;
    }
  }

}
