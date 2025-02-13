import { Component } from '@angular/core';
import { EditorContainerComponent } from "../editor-container/editor-container.component";

@Component({
  selector: 'app-dashboard',
  imports: [EditorContainerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
