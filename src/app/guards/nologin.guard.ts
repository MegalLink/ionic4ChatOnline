import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate  {
  constructor(private afAuth : AngularFireAuth,private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.afAuth.authState.pipe(map(auth=>{
        if(isNullOrUndefined(auth)){
          
          return true
        }else{
          this.router.navigate(['/home']); //si esta logeado ya no puede acceder a login
          return false
          
        }
      }))
       
      
      
      }

}
