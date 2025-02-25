import { Section } from "./section";

export class Tab {
    id: string;
    title: string;
    sections: Section[];
    
    constructor(id:string,title: string, sections: any[]){
        this.id = id;
        this.title = title;
        this.sections = sections;
    }
}
