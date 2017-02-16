import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, Request, XHRBackend, RequestOptions} from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/';
import { LoginComponent } from './components/';
import { LogoutComponent } from './components/';
import { NullComponent } from './components/';

import { AuthGuard } from './utils/index';
import { HttpInterceptor } from './utils/index';

import { modules } from './modules';

export const appRoutes: Routes = [
	{
		path : 'login',
		component : LoginComponent
	},
	{
		path : 'logout',
		component : LogoutComponent,
		canActivate : [AuthGuard]
	},
	{
		path: '',
		component: HomeComponent,
		canActivate : [AuthGuard]
	},
	{
		path: '**',
		component: NullComponent
	}
];

export function setFactory (xhrBackend: XHRBackend,
				requestOptions: RequestOptions,
				router: Router) {
	return new HttpInterceptor(xhrBackend, requestOptions, router);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    NullComponent
  ],
  imports: [
	modules,
    BrowserModule,
	FormsModule,
	HttpModule,
	NgbModule.forRoot(),
	RouterModule.forRoot(appRoutes)
  ],
  providers: [
	AuthGuard,
		{
			provide : Http,
			useFactory: setFactory,
			deps: [XHRBackend, RequestOptions, Router]
		}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }