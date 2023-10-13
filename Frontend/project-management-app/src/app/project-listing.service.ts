import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectListingService {
  private baseUrl = 'http://localhost:3310/project';

  constructor(private http: HttpClient) {}

  // Fetch the list of projects
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`);
  }

  // Fetch project details by ID
  getProjectById(projectId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/${projectId}`);
  }

  // Add a new project
  addProject(projectData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, projectData);
  }

  // Update a project
  updateProject(projectData: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/update/${projectData._id}`,
      projectData
    );
  }

  // Delete a project by ID
  deleteProject(projectId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${projectId}`);
  }

  // Define a method to fetch project details by ID
  getProjectDetails(projectId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${projectId}`); // Adjust the endpoint
  }
}
