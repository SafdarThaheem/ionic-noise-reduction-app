import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recording',
  templateUrl: './recording.page.html',
  styleUrls: ['./recording.page.scss'],
})
export class RecordingPage implements OnInit {
  recordAudio: boolean = false;
  constructor() {}

  ngOnInit() {}

  onRecordAudio() {
    this.recordAudio = !this.recordAudio;
  }
}
