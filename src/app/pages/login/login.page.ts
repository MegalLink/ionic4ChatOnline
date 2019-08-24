import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authS:AuthService, public router:Router) { }
 emailTs: string;
 passwordTs: string;
  ngOnInit() {
  }
onSubmitLogin(){
  this.authS.login(this.emailTs,this.passwordTs).then(respuesta=>{
 this.router.navigate(['/home']);
  }).catch(error=>alert('Los datos son incorrectos o no existe el usuario'));
}

}
