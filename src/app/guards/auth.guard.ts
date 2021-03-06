import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from 'util';
import { auth } from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth : AngularFireAuth,private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.afAuth.authState.pipe(map(auth=>{
        if(isNullOrUndefined(auth)){ //si no esta logeado no puede acceder al home
          this.router.navigate(['/login']);
          return false
        }else{
          return true
        }
      }))
       
      
      
      }

  
  
}
