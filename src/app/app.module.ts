import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewUserComponent } from './new-user/new-user.component';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes: Routes = [
  {path: '', component: NewUserComponent},
  {path: 'welcome', component: WelcomeComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
