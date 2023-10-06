// project-listing.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.css'],
})
export class ProjectListingComponent implements OnInit {
  projects: any[] = [];
  selectedProjectId: any | null = null; // Initialize as null

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  onProjectClick(project: any): void {
    if (this.selectedProjectId === project._id) {
      // If the same project is clicked again, close the details
      this.selectedProjectId = null;
    } else {
      // Otherwise, fetch project details and display them
      this.http
        .get(`http://localhost:3300/project/get/${project._id}`)
        .subscribe({
          next: (projectDetails: any) => {
            this.selectedProjectId = projectDetails._id;
          },
          error: (error: any) => {
            // Handle error
            console.error('Error fetching project details:', error);
          },
        });
    }
  }

  private fetchProjects(): void {
    this.http.get<any[]>('http://localhost:3300/project/list').subscribe({
      next: (projects: any[]) => {
        this.projects = projects;
      },
      error: (error: any) => {
        console.error('Error fetching projects:', error);
      },
    });
  }
}
