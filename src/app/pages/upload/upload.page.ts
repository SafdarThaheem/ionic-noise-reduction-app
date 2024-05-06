import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  uploadedFile: File | null = null;
  constructor(private webSocketServer: WebSocketService) {}

  ngOnInit() {}

  onFileSelect(event: any) {
    const files: FileList | null = event?.target?.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      if (this.isFileAudio(file)) {
        this.uploadedFile = file;
      } else {
        // Handle error or notify user about invalid file format
      }
    } else {
      // Handle error or notify user about no file selected
    }
  }

  isFileAudio(file: File): boolean {
    return file.type.startsWith('audio/');
  }

  uploadFile() {
    console.log('upload file function call');
    if (this.uploadedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result; // File data to send over WebSocket
        this.webSocketServer.sendUploadedFile(fileData);
      };
      reader.readAsArrayBuffer(this.uploadedFile);
    } else {
      // Handle error or notify user about no file selected
    }
  }
}
