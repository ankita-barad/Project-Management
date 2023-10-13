import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3310'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Method to get tasks for a specific project
  getTasks(projectId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/task/list/${projectId}`);
  }

  // Method to add a task to a specific project
  addTask(task: any, projectId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/task/create/${projectId}`, task);
  }

  deleteTask(projectId: string, taskId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/task/delete/${projectId}/${taskId}`
    );
  }
  // Example method to update a task in a project
  updateTask(projectId: string, task: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/task/update/${projectId}/${task._id}`,
      task
    );
  }
}
