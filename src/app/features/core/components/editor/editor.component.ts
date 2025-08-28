import { CommonModule } from '@angular/common';
import { Component, OnInit,inject, ViewChild, Pipe } from '@angular/core';
import { Step } from '../../models/step';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule,FormGroup, FormArray,} from '@angular/forms';
import {MatStepper, MatStepperModule} from '@angular/material/stepper'
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabGroup } from '@angular/material/tabs';
import { Tab } from '../../models/tab';
import {MatCardModule} from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList,moveItemInArray} from '@angular/cdk/drag-drop';
import { GroupQuestionsByRowPipe } from '../../pipes/group-questions-by-row.pipe';


import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogConfig,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { Question } from '../../models/question';
import { Section } from '../../models/section';

@Component({
  selector: 'app-editor',
  imports: [CommonModule,MatCardModule,GroupQuestionsByRowPipe,CdkDrag,CdkDropList,CdkDragHandle,MatRadioModule,MatTabsModule,MatInputModule ,MatListModule, FormsModule,MatStepperModule,MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  steps:Step[] = [];
  tabs:Tab[] = [];
  sections:Section[]=[];
  questions:Question[]=[];

  selectedTabIndex :number = 0;


  @ViewChild('stepper') stepper: MatStepper | undefined;


  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  dialogRef: MatDialogRef<QuestionDialogComponent> | undefined; 

  constructor(private dialog:MatDialog){
    
  }

  groupQuestionsByRow(questions: Question[]): Question[][] {
  const rows: Question[][] = [];
  let currentRow: Question[] = [];
  questions.forEach((q, idx) => {
    if (q.newline || idx === 0) {
      if (currentRow.length) rows.push(currentRow);
      currentRow = [q];
    } else {
      currentRow.push(q);
    }
  });
  if (currentRow.length) rows.push(currentRow);
  return rows;
}

  drop(event: CdkDragDrop<Tab[]>, stepIndex: number) {
    moveItemInArray(this.steps[stepIndex].tabs, event.previousIndex, event.currentIndex);
    this.selectedTabIndex = event.currentIndex; // Update selected index
  }



  openDialog() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '60vw'; 
  dialogConfig.height = '80vh';
  dialogConfig.maxWidth = 'none';
  this.dialogRef = this.dialog.open(QuestionDialogComponent, dialogConfig);
  this.dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.questions = [...this.questions, result]; // update reference
      const tab = this.steps[this.stepper!.selectedIndex].tabs[this.selectedTabIndex];
      let section = tab.sections.find(section => section.title === result.section);
      if (!section) {
        tab.sections.push(new Section(crypto.randomUUID(), result.section, [result]));
      } else {
        section.questions = [...section.questions, result]; // update reference
      }
    }
  });
}

  ngOnInit() {
  }


  addStep(){
    while(true){
      let id = this.generateRandomId();
      if(this.steps.filter(step=>step.id===id).length===0){
        this.steps.push(new Step(id, "Step "+(this.steps.length+1), []));
        break;
      }
    }
  }

  trackById(index: number, item: Tab): string {
    return item.id;

  }

    trackByQuestionId(index: number, item: Question): string {
    return item.id;

  }

  shiftStepLeft(index: number){
    if(index === 0){
      return;
    }

    let temp = this.steps[index];
    this.steps[index] = this.steps[index-1];
    this.steps[index-1] = temp;
    this.stepper!.selectedIndex = index - 1;


  }

  shiftStepRight(index: number){
    if(index === this.steps.length-1){
      return;
    }

    let temp = this.steps[index];
    this.steps[index] = this.steps[index+1];
    this.steps[index+1] = temp;
    this.stepper!.selectedIndex = index +1;
  }


  addTab(stepIndex:number){
    while(true){
      let id = this.generateRandomId();
      if(this.tabs.filter(tab=>tab.id===id).length===0){
        this.tabs.push(new Tab(id, "Tab "+(this.steps[stepIndex].tabs.length+1), []));
        this.steps[stepIndex].tabs.push(this.tabs[this.tabs.length-1]);
        break;
      }
    }
  }

  deleteTab(index:number){
    this.steps[this.stepper!.selectedIndex].tabs.splice(index,1);
  }

  selectTab(index:number){
    this.selectedTabIndex = index;
  }

  deleteStep(index:number){
    this.steps.splice(index,1);
  }


  generateRandomId(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  moveTabUp(index: number) {
    if (index > 0) {
      const tabs = this.steps[this.stepper!.selectedIndex].tabs;
      [tabs[index - 1], tabs[index]] = [tabs[index], tabs[index - 1]];
      this.selectedTabIndex = index - 1; // Update selected index
    }
  }

  moveTabDown(index: number) {
    const tabs = this.steps[this.stepper!.selectedIndex].tabs;
    if (index < tabs.length - 1) {
      [tabs[index + 1], tabs[index]] = [tabs[index], tabs[index + 1]];
      this.selectedTabIndex = index + 1; // Update selected index
    }
  }

}

