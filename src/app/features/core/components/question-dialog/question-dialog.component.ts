import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Question } from '../../models/question';

@Component({
  selector: 'app-question-dialog',
  imports: [MatFormFieldModule,FormsModule ,MatButtonModule,CommonModule, MatInputModule,MatDialogModule,MatSelectModule],
  standalone:true,
  templateUrl: './question-dialog.component.html',
  styleUrl: './question-dialog.component.scss'
})
export class QuestionDialogComponent {


  questionType: any = '';
  options: string[] = [];
  code:string = '';
  prompt:string = '';
  required:boolean = false;
  section:string = '';

  constructor(public dialogRef: MatDialogRef<QuestionDialogComponent>) {}


  closeDialog() {
    this.dialogRef.close();
  }

  saveAndClose(){
    let question = new Question(
      crypto.randomUUID(),
      this.code,
      this.questionType,
      this.options,
      this.prompt,
      this.section,
      this.required
    );
    this.dialogRef.close(question);
  }

  addOption() {
    this.options.push('');
  }

  moveOptionUp(index: number) {
    if (index > 0) {
      const temp = this.options[index];
      this.options[index] = this.options[index - 1];
      this.options[index - 1] = temp;
    }
  }

  moveOptionDown(index: number) {
    if (index < this.options.length - 1) {
      const temp = this.options[index];
      this.options[index] = this.options[index + 1];
      this.options[index + 1] = temp;
    }
  }

  trackByIndex(index: number, item: any): number {
  return index;
}

}
