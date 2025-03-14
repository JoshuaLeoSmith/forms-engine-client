import { AfterViewInit, Component, OnInit, inject, LOCALE_ID, signal, Inject, PLATFORM_ID, ENVIRONMENT_INITIALIZER } from '@angular/core'; // update this
import { interval,Subscription } from 'rxjs';
import {isPlatformBrowser} from "@angular/common"; 
import { AudioService } from '../../services/audio.service';
import { environment } from '../../../../../environments/environment';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  texts:string[] = ["STOP WASTING TIME.", "STREAMLINE DATA INPUT.", "CREATE COMPLEX QUESTIONNAIRES.",
     "STRAIGHT TO PRODUCTION.", "20 QUESTION TYPES.", "4 LAYERS OF ORGANIZATION.", "DYNAMIC RULESET.",
      "JOIN THE WAITLIST.", "QUESTION NEXUS."]
  currentIndex:number = 0;
  intervalId: any;

  isBrowser = signal(false); 
  audio: HTMLAudioElement | null = null; // Class-level property to manage the Audio object


  constructor(@Inject(PLATFORM_ID) platformId: object, private audioService: AudioService, @Inject(DOCUMENT) private document: Document) { 
    this.isBrowser.set(isPlatformBrowser(platformId));  
  }
  
  ngOnInit(){
    // let audio = this.document.getElementById("audio") as HTMLAudioElement;
    // audio.play();
  }

  ngAfterViewInit(): void {
    this.startTextRotation();
    
  }

  startTextRotation(){
    if(this.isBrowser()) { // check it where you want to write setTimeout or setInterval
      this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      }, 1500); // Change text every 2 seconds
    }
  }
  stopTextRotation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnDestroy(){
    this.audioService.stopAudio();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
