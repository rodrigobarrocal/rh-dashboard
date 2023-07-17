import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import {
	NgxMaskDirective,
	NgxMaskPipe,
	provideEnvironmentNgxMask,
} from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewUserComponent } from './new-user/new-user.component';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes: Routes = [
	{ path: '', component: NewUserComponent },
	{ path: 'welcome/:key', component: WelcomeComponent },
	{ path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
	declarations: [AppComponent, WelcomeComponent, NewUserComponent],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		NgxMaskDirective,
		NgxMaskPipe,
		HttpClientModule,
		RouterModule.forRoot(appRoutes),
	],
	providers: [provideEnvironmentNgxMask()],
	bootstrap: [AppComponent],
})
export class AppModule {}
