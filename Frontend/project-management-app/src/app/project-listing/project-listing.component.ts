// project-listing.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectListingService } from '../project-listing.service';

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.component.html',
  styleUrls: ['./project-listing.component.css'],
})
export class ProjectListingComponent implements OnInit {
  projects: any[] = [];
  newProject: any = {};
  editedProject: any = {}; // Initialize an empty object for editing a project
  selectedProjectId: any | null = null; // Initialize as null

  constructor(
    private http: HttpClient,
    private projectListingService: ProjectListingService
  ) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  onProjectClick(project: any): void {
    if (this.selectedProjectId === project._id) {
      // If the same project is clicked again, close the details
      this.selectedProjectId = null;
    } else {
      // Otherwise, fetch project details and display them
      this.projectListingService.getProjectById(project._id).subscribe({
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
    this.projectListingService.getProjects().subscribe({
      next: (projects: any[]) => {
        console.log(projects);
        this.projects = projects;
      },
      error: (error: any) => {
        console.error('Error fetching projects:', error);
      },
    });
  }

  addProject(): void {
    this.projectListingService.addProject(this.newProject).subscribe(() => {
      // Reset the newProject object
      this.newProject = {};
      // Refresh the project list
      this.fetchProjects();
    });
  }

  // Toggle edit mode for a project
  onEditClick(project: any): void {
    if (this.isEditing(project)) {
      // If already in edit mode, cancel it
      this.cancelEdit();
    } else {
      // If not in edit mode, start editing
      this.editedProject = { ...project }; // Clone the project for editing
    }
  }

  // Check if a project is in edit mode
  isEditing(project: any): boolean {
    return this.editedProject._id === project._id;
  }

  // Update a project
  updateProject(): void {
    this.projectListingService
      .updateProject(this.editedProject)
      .subscribe(() => {
        // Reset the editedProject object and refresh the project list
        this.editedProject = {};
        this.fetchProjects();
      });
  }

  // Cancel editing and discard changes
  cancelEdit(): void {
    this.editedProject = {};
  }

  deleteProject(projectId: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectListingService.deleteProject(projectId).subscribe(() => {
        // Refresh the project list after deletion
        this.fetchProjects();
      });
    }
  }
}
