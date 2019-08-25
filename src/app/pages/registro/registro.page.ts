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
public password2Ts: string;
  constructor(private authS: AuthService, private router:Router) { }

  ngOnInit() {
  }
 OnSubmitRegister(){
  this.authS.register(this.emailTs,this.passwordTs,this.nameTs).then(auth=>{
    this.router.navigate(['/home'])
  }).catch(error=>console.log(error))
  
 }

}
