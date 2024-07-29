import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageDocsComponent } from './page-docs/page-docs.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageMaterialsComponent } from './page-materials/page-materials.component';
import { PageExamComponent } from './page-exam/page-exam.component';
import { PageAccountComponent } from './page-account/page-account.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PageAboutComponent,
    PageDocsComponent,
    PageLoginComponent,
    PageRegisterComponent,
    PageMaterialsComponent,
    PageExamComponent,
    PageAccountComponent,
    PageHomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [provideHttpClient(), AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
