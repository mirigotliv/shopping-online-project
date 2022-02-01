import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent {
    
    @Input() onChange: Function
    timeOut: number = null

    public search(event: any) {
        if (this.timeOut) {
            window.clearTimeout(this.timeOut)
        }

        this.timeOut = window.setTimeout(() => {
            this.timeOut = null
            this.onChange(event.target.value)
        }, 300)
    }
}