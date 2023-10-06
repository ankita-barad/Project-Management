import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProjectListingComponent } from './project-listing/project-listing.component';
import { TaskListingComponent } from './task-listing/task-listing.component';

@NgModule({
  declarations: [AppComponent, ProjectListingComponent, TaskListingComponent],
  imports: [HttpClientModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
