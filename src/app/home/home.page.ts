import { ChatService } from './../services/chat.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { InterfaceChatRoom} from "../interfaces/InterfaceChatRoom";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

public chatRooms: any=[];
  constructor(public authS: AuthService,public chatService: ChatService) {}
  ngOnInit(){//subscribe es para estar viendo los cambios en tiempo real
    this.chatService.getChatRooms().subscribe(chats=>{
     this.chatRooms=chats;
    })
  }
 onLogOut(){
this.authS.logOut();
 }
}
