import { Tab } from "./tab";

export class Step {
    id: string='';
    title: string='';
    tabs: Tab[] = [];

    constructor(id: string, title: string, tabs: Tab[]) {
        this.id = id;
        this.title = title;
        this.tabs = tabs;
    }
}
