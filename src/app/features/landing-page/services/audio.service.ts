import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio: HTMLAudioElement | null = null;

  playAudio(audioUrl: string): void {
    if (!this.audio) {
      this.audio = new Audio("synthwave.wav");
    }
    this.audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  }

  stopAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0; // Reset to the beginning
    }
  }

}
