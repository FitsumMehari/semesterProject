import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageDocsComponent } from './page-docs/page-docs.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageAccountComponent } from './page-account/page-account.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { AuthGuardService } from './auth-guard.service';
import { PageMaterialsComponent } from './page-materials/page-materials.component';
import { PageExamComponent } from './page-exam/page-exam.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'about-us',
    component: PageAboutComponent,
  },
  {
    path: 'documentation',
    component: PageDocsComponent,
  },
  {
    path: 'sign-up',
    component: PageRegisterComponent,
  },
  {
    path: 'sign-in',
    component: PageLoginComponent,
  },
  {
    path: 'profile',
    component: PageAccountComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'home',
    component: PageHomeComponent,
  },
  { path: 'materials', component: PageMaterialsComponent, canActivate: [AuthGuardService] },
  { path: 'exam', component: PageExamComponent, canActivate: [AuthGuardService] },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
