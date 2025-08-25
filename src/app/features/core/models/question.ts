export class Question {
    id:string;
    code:string;
    type:string;
    options: string[];
    prompt:string;
    section:string;
    required:boolean;

    constructor(id:string, code:string, type:string, options:string[], prompt:string, section:string, required:boolean) {
        this.id = id;
        this.code = code;
        this.type = type;
        this.options = options;
        this.prompt = prompt;
        this.section = section;
        this.required = required;
    }
    
}
