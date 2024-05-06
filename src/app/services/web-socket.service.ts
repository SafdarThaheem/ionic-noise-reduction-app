import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor(private socket: Socket) {}

  connectSocket(url: any) {
    this.socket.connect(url);
  }

  sendAudioToSocket(audioData: any) {
    console.log(audioData);
    return this.socket.emit('audio', audioData);
  }
}
