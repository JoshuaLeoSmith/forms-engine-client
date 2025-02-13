import { Component } from '@angular/core';
import { EditorComponent } from "../editor/editor.component";

@Component({
  selector: 'app-editor-container',
  imports: [EditorComponent],
  templateUrl: './editor-container.component.html',
  styleUrl: './editor-container.component.scss'
})
export class EditorContainerComponent {

}
