import { InterfaceChatRoom } from './../interfaces/InterfaceChatRoom';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { InterfaceMessage } from '../interfaces/InterfaceMessage';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFirestore) { }

  getChatRooms(){
   return this.db.collection('chatRooms').snapshotChanges().   //retornando la coleccion de datosobservando
   // los cambios en tiempo real
   pipe(map(rooms=>{ //esto es que para cuando recarge los datos en firebase no se clonen dobles
     return rooms.map(room=>{ 
      const data=room.payload.doc.data() as InterfaceChatRoom;
      data.id=room.payload.doc.id
      return data;
     })
   }))
  }
  getChatRoom(chatId: string){
    return this.db.collection('chatRooms').doc(chatId).valueChanges() //un solo observable

  }
  sendMsgToFirebase(message: InterfaceMessage,chat_id: string){
    
   this.db.collection('chatRooms').doc(chat_id).update({  
     
      messages: firestore.FieldValue.arrayUnion(message) //push en un arreglo
   })

  }
}
