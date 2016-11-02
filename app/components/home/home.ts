import {Component} from '@angular/core';

@Component({
	selector: 'app',
	templateUrl: 'home.html'
})

export class HomeComponent {
	contentType: boolean;
	constructor() {
		this.contentType = true;
	}
}

