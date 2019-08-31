import { AuthService } from './../../services/auth.service';
import { InterfaceUser } from './../../interfaces/InterfaceUser';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router:Router,public authS: AuthService) { }
  public uName:string;
  public uUrl:string;
  user: InterfaceUser={
    name: '',
    email: '',
    photoUrl: ''
    
      };
    modificar:boolean=false;
  ngOnInit() {

    this.authS.isAuth().subscribe(user=>{
      if(user){
        this.user.name=user.displayName;
        this.user.email=user.email;
        this.user.photoUrl=user.photoURL;
        
        console.log('USER',user);
        this.uName=user.displayName;
        this.uUrl=user.photoURL;
      }
     
    })
  }
regresarHome(){
this.router.navigate(['/home']);
}
modificarM(){
this.modificar=true;
}
actualizarUser(){
  this.authS.updateUserDataDefault(this.uName,this.user.photoUrl)
  this.modificar=false;
  this.user.name=this.uName;
  
}

}
