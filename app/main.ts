import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {TabsComponent} from './components/tabs/tabs';
import {HomeComponent} from './components/home/home';

@NgModule({
	bootstrap: [HomeComponent],
	imports: [BrowserModule, HttpModule],
	providers: [],
	declarations: [HomeComponent, TabsComponent],
})

export class MainModule {
}
