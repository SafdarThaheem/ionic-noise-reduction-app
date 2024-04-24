import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import { Options } from 'recordrtc';

@Component({
  selector: 'app-recording',
  templateUrl: './recording.page.html',
  styleUrls: ['./recording.page.scss'],
})
export class RecordingPage implements OnInit {
  title: string = 'record-audio';
  record: any;
  recordAudio: boolean = false;
  url: any;
  error: any;
  recordingTime: string = '00:00';
  timer: any;
  startTime!: number;

  constructor(private domSanitizer: DomSanitizer) {}

  sanitizer(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit() {}

  startRecording() {
    console.log('start Recording');
    this.recordAudio = true;
    this.startTime = new Date().getTime();
    this.timer = setInterval(() => {
      this.updateRecordingTime();
    }, 1000);

    let mediaConstraints = {
      video: false,
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream: MediaStream) {
    const option: Options = {
      mimeType: 'audio/wav',
      // numberOfAudioChannels: 2,
    };
    const stereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new stereoAudioRecorder(stream, option);
    this.record.record();
    console.log('record', this.record);
  }

  stopRecording() {
    console.log('stop Recording');
    this.recordAudio = false;
    clearInterval(this.timer);
    this.recordingTime = '00:00';
    this.record.stop(this.processRecording.bind(this));
  }

  discardRecording() {
    console.log('discard Recording');
    this.recordAudio = false;
    clearInterval(this.timer); // Stop the recording timer
    this.recordingTime = '00:00'; // Reset recording time
    this.startTime = 0; // Reset start time
  }

  processRecording(blob: any) {
    this.url = URL.createObjectURL(blob);
    console.log('blob ', blob);
    console.log(this.url);
  }

  errorCallback(error: any) {
    this.error = "con't pay Audio";
  }

  updateRecordingTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - this.startTime;
    this.recordingTime = this.formatTime(elapsedTime);
  }

  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(val: number): string {
    return val < 10 ? '0' + val : val.toString();
  }
}
