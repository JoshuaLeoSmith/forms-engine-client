import { CommonModule } from '@angular/common';
import { Component, OnInit,inject, ViewChild } from '@angular/core';
import { Step } from '../../models/step';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepper, MatStepperModule} from '@angular/material/stepper'
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabGroup } from '@angular/material/tabs';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editor',
  imports: [CommonModule,MatTabsModule,MatInputModule ,MatListModule, FormsModule,MatStepperModule,MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
  steps:Step[] = [];
  tabs:any = [];
  sections:any=[];
  questions:any=[];

  @ViewChild('stepper') stepper: MatStepper | undefined;


  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

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


  addTab(){
    this.steps[this.stepper!.selectedIndex].tabs.push({title: "Tab "+(this.steps[this.stepper!.selectedIndex].tabs.length+1), sections: []});
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

}

