import {Component, Input} from '@angular/core';

@Component({
	selector: 'tabs',
	templateUrl: 'tabs.html'
})

export class TabsComponent {
	@Input() title: String;
	constructor() {
		//
	}
}
