import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth , 
    private router:Router,
    private db:AngularFirestore
    ) { }

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
register(email:string, password:string, name:string){
  return new Promise((resolve,reject)=>{
    this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(res=>{
      const uId=res.user.uid;
      this.db.collection('users').doc(uId).set({
        name: name,
        uid: uId
      })
      resolve(res)
    }).catch(error=> reject())
  })
 
}

}
