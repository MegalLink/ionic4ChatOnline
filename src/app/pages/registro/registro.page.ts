import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
public nameTs: string;
public emailTs: string;
public passwordTs: string;
public photoUrlTs="https://firebasestorage.googleapis.com/v0/b/chatonline-d5aa5.appspot.com/o/user_logo.png?alt=media&token=4077ce30-5fec-4fcc-b6a0-f6a3399addc2";
  constructor(private authS: AuthService, private router:Router) { }

  ngOnInit() {
  }
 OnSubmitRegister(){
  this.authS.register(this.emailTs,this.passwordTs,this.nameTs,this.photoUrlTs).then(auth=>{
    this.router.navigate(['/home'])
  }).catch(error=>console.log(error))
  
 }

}
