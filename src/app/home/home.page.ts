import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { InterfaceUser } from './../interfaces/InterfaceUser';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ChatService } from './../services/chat.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

import {ModalController} from "@ionic/angular";
import { ChatComponent} from '../componentes/chat/chat.component';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

   
public chatRooms: any=[];
  constructor(public authS: AuthService,
    public chatService: ChatService, 
    private modal: ModalController,
    public actionSheetController: ActionSheetController,
    private afAuth:AngularFireAuth,
    private router: Router
    ) {}
  ngOnInit(){//subscribe es para estar viendo los cambios en tiempo real
    this.chatService.getChatRooms().subscribe(chats=>{
     this.chatRooms=chats;
     
    })
    
  }
 onLogOut(){
this.authS.logOut();
 }
openChat(chat){
this.modal.create({
  component: ChatComponent,//Este modal debe ser importado en declarations y entry components
  componentProps:{
    chat: chat //esto es lo que le vamos a pasar al modal

  }
}).then((modal)=>modal.present()); //cuando el modal este creado lo presenta
}
async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create(
    {
    header: 'Opciones',
    buttons: [{
      text: 'Desconectarse',
      role: 'destructive',
      icon: 'log-out',
      handler: () => { //Desencade = Trigger
        this.onLogOut();
      }
    },{
      text: 'Mi Perfil',
      icon: 'contact',
      handler: () => { //Desencade = Trigger
       this.router.navigate(['/profile']);
      }
    }
  ]
  });
  await actionSheet.present();
}



}
