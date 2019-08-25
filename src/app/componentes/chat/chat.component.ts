import { ChatService } from './../../services/chat.service';
import { InterfaceMessage } from './../../interfaces/InterfaceMessage';
import { Component, OnInit} from '@angular/core';
import {NavParams,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  constructor(private navparams:NavParams, private modal:ModalController,
    private chatService:ChatService) { }
  public chat: any;
  public mensajes=[];
  //public message:InterfaceMessage;
  public room: any;
  public msg: string;
  ngOnInit( ){//si retorna un observable podemos subscribirnos
   this.chatService.getChatRoom(this.chat.id).subscribe(room=>{
    this.room=room;
   })
   this.chat= this.navparams.get('chat');
  }
  closeChat(){
    this.modal.dismiss()
  }
 sendMessage(){
   const mensaje: InterfaceMessage={
content: this.msg,
type: 'text',
date: new Date()
   }
   this.chatService.sendMsgToFirebase(mensaje,this.chat.id);
   this.msg="";
   
 }
}
