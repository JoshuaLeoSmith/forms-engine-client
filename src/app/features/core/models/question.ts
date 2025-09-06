export class Question {
    id:string;
    code:string;
    type:string;
    options: string[];
    prompt:string;
    section:string;
    required:boolean;
    textBoxSize:string = 'small;'
    halfWidth: boolean = false;
    fullWidth: boolean = false;
    constructor(id:string, code:string, type:string, options:string[], prompt:string, section:string, required:boolean, textBoxSize:string='small;', halfWidth:boolean=false, fullWidth:boolean=false, public newline: boolean = false, fullWidthOnMobile: boolean = false) {
        this.id = id;
        this.code = code;
        this.type = type;
        this.options = options;
        this.prompt = prompt;
        this.section = section;
        this.required = required;
        this.textBoxSize = textBoxSize;
        this.halfWidth = halfWidth;
        this.fullWidth = fullWidth;
    }
}
