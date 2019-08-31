import { ChatService } from './../../services/chat.service';
import { InterfaceMessage } from './../../interfaces/InterfaceMessage';
import { Component, OnInit} from '@angular/core';
import {NavParams,ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  constructor(private navparams:NavParams, private modal:ModalController,
    private chatService:ChatService,private authS:AuthService) { }
  public chat: any;
  public mensajes=[];
  //public message:InterfaceMessage;
  public room: any;
  public msg: string;
  public nameUser: string;
  public urlUser: string;
  SimpleDateFormat
  ngOnInit( ){//si retorna un observable podemos subscribirnos
   this.chatService.getChatRoom(this.chat.id).subscribe(room=>{
    this.room=room;

   })
   this.chat= this.navparams.get('chat');
   
   //para el user
   
   this.authS.isAuth().subscribe(user=>{
    if(user){
      this.nameUser=user.displayName;
     
      this.urlUser=user.photoURL;
      
    }
   
  })
  }
  closeChat(){
    this.modal.dismiss()
  }
 sendMessage(){
   const mensaje: InterfaceMessage={
content: this.msg,
type: 'text',
date: new Date(),
nameUser: this.nameUser,
imgUser: this.urlUser
   }

   this.chatService.sendMsgToFirebase(mensaje,this.chat.id);
   this.msg="";
   
 }
 aumentarMsg(variable: any){
return 'Mensage :'+ variable;
 }
 formatearFecha(variable:any){
  //"Timestamp(seconds=1566763049, nanoseconds=633000000)" 
  return 
 }
}
