import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    const webSocketUrl: string = 'ws://182.183.33.158:500';
    this.webSocketService.connectSocket(webSocketUrl);
  }
}
