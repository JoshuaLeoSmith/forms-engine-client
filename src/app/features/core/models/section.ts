import { Question } from "./question";

export class Section {
    id: string;
    title: string;
    showSectionTitle: boolean = true;
    questions: Question[];
    
    constructor(id: string, title: string, questions: Question[]) {
        this.id = id;
        this.title = title;
        this.questions = questions;
    }
}
