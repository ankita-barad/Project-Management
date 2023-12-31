import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HTTP_INTERCEPTORS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProjectListingComponent } from './project-listing/project-listing.component';
import { TaskListingComponent } from './task-listing/task-listing.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TaskComponent } from './task/task.component';
import { AuthInterceptor } from './auth-interceptor.service'; // Import the AuthInterceptor

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'project', component: ProjectListingComponent },
  { path: 'task', component: TaskListingComponent },
  { path: 'tasks/:id', component: TaskComponent },
  { path: 'logout', component: LoginComponent },

  // Add other routes for your application
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login page
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProjectListingComponent,
    TaskListingComponent,
    TaskComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    // Add AuthInterceptor to the list of HTTP_INTERCEPTORS
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
