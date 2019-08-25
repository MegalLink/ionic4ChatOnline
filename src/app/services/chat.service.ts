import { InterfaceChatRoom } from './../interfaces/InterfaceChatRoom';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

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
}
