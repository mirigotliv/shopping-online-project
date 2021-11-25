import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-step',
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.css']
})
export class StepComponent {

    @Input()
    public numberStep: number

    @Input()
    public text: string

    @Input()
    public labelField1: string

    @Input()
    public labelField2: string

    @Input()
    public labelField3: string

    @Input()
    public labelField4: string

    @Input()
    public placeholderInput1: string

    @Input()
    public placeholderInput2: string

    @Input()
    public placeholderInput3: string

    @Input()
    public placeholderInput4: string

    @Input()
    public classInput1: string

    @Input()
    public classInput2: string

    @Input()
    public classInput3: string

    @Input()
    public classInput4: string

    @Input()
    public idInput1: string

    @Input()
    public idInput2: string

    @Input()
    public idInput3: string

    @Input()
    public idInput4: string
}
