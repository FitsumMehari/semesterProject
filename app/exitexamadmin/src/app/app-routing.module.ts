import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { ExamsComponent } from './exams/exams.component';
import { MaterialsComponent } from './materials/materials.component';
import { OverviewComponent } from './overview/overview.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    // outlet: 'app',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'exams',
        component: ExamsComponent,
        // outlet: 'container',
      },
      {
        path: 'materials',
        component: MaterialsComponent,
        // outlet: 'container',
      },
      {
        path: 'overview',
        component: OverviewComponent,
        // outlet: 'container',
      },
      {
        path: 'users',
        component: UsersComponent,
        // outlet: 'container',
      },
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'overview',
      },
    ],
  },

  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
    // outlet: 'app',
  },
  {
    path: '**',
    redirectTo: 'sign-in',
    // outlet: 'app',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
