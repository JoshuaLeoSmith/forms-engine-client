import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../models/question';

@Pipe({ name: 'groupQuestionsByRow', pure: true })
export class GroupQuestionsByRowPipe implements PipeTransform {
  transform(questions: Question[]): Question[][] {
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
}