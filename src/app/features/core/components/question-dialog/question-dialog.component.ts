import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-question-dialog',
  imports: [MatFormFieldModule, MatInputModule,MatDialogModule],
  standalone:true,
  templateUrl: './question-dialog.component.html',
  styleUrl: './question-dialog.component.scss'
})
export class QuestionDialogComponent {

}
