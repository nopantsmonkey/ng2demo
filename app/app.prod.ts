import {platformBrowser} from '@angular/platform-browser';
import {MainModuleNgFactory} from '../ngfactory/app/main.ngfactory';

platformBrowser()
	.bootstrapModuleFactory(MainModuleNgFactory)
	.catch(err => console.error(err));
