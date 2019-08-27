import { InterfaceUser } from './../interfaces/InterfaceUser';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
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
  return this.afAuth.authState.pipe(map(auth=>auth));
}
register(email:string, password:string, name:string){
  return new Promise((resolve,reject)=>{
    this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(res=>{
      const uId=res.user.uid;

      this.db.collection('users').doc(uId).set({
        name: name,
        uid: uId,
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/chatonline-d5aa5.appspot.com/o/user_logo.png?alt=media&token=4077ce30-5fec-4fcc-b6a0-f6a3399addc2',
      })
      resolve(res)
    }).catch(error=> reject())
  })
 
}


}
