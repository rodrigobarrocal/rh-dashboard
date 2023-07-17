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
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewUserComponent } from './welcome/new-user/new-user.component';
import { SetupComponent } from './welcome/setup/setup.component';

const appRoutes: Routes = [
	{ path: '', component: NewUserComponent },
	{ path: 'setup/:key', component: SetupComponent },
	{ path: 'dashboard/:key', component: DashboardComponent },
	{ path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
	declarations: [
		AppComponent,
		SetupComponent,
		NewUserComponent,
		DashboardComponent,
	],
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
