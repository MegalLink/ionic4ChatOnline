import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth , private router:Router) { }

login(mail,pass){
  return new Promise((aceptado,rechazado)=>{
    this.afAuth.auth.signInWithEmailAndPassword(mail,pass).then(respuesta=>{
      aceptado(respuesta.user)
    }).catch(error=>rechazado(error));
  
  })
  

  
}
logOut(){
  this.afAuth.auth.signOut().then(()=>{
    this.router.navigate(['/login']);
  })
  
}
isAuth(){
  
}

}
