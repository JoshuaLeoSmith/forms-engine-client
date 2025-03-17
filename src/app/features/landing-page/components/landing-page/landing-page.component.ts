import { AfterViewInit, Component, OnInit, inject, LOCALE_ID, signal, Inject, PLATFORM_ID, ENVIRONMENT_INITIALIZER, HostListener } from '@angular/core'; // update this
import { interval,Subscription } from 'rxjs';
import {CommonModule, isPlatformBrowser} from "@angular/common"; 
import { AudioService } from '../../services/audio.service';
import { environment } from '../../../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-landing-page',
  imports: [MatCardModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  texts: string[] = [
    "Stop Wasting Time",
    "Streamline Data Input",
    "Create Complext Questionnaires",
    "Straight to Production",
    "20 Question Types",
    "4 Layers of Organization",
    "Dyanimc Ruleset",
    "Join the Waitlist"
  ];
  currentIndex: number = 0;


  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
      const rect = feature.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        feature.classList.add('animate');
      }
    });
  }

  getDescription(feature: string): string {
    const descriptions: { [key: string]: string } = {
      "Stop Wasting Time": "Your data input needs change every day. Why waste time continuing to roll out complex and static code changes?",
      "Streamline Data Input": "Our platform allows you to easily create and deploy dynamic forms, saving you time and effort.",
      "Create Complext Questionnaires": "Design intricate questionnaires with ease using our advanced features.",
      "Straight to Production": "No deployment required. Our system detects your changes and updates in real-time.",
      "20 Question Types": "Choose from a wide variety of question types to suit your needs, including radio button, checkbox, date input, and many more.",
      "4 Layers of Organization": "Organize your data with a robust four-layer structure.",
      "Dyanimc Ruleset": "Apply dynamic rules to customize the behavior of your forms. Validate responses, show/hide questions, and more.",
      "Join the Waitlist": "Be the first to experience our cutting-edge platform by joining the waitlist.",
    };

    return descriptions[feature] || "Description not available.";
  }

  joinWaitlist(): void {
    alert('Thank you for joining the waitlist! We will contact you soon.');
  }

}
