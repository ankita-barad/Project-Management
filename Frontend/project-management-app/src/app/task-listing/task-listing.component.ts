import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-listing',
  templateUrl: './task-listing.component.html',
  styleUrls: ['./task-listing.component.css'],
})
export class TaskListingComponent implements OnInit {
  tasks: any[] = [];
  selectedTaskId: any | null = null; // Initialize as null

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  onTaskClick(task: any): void {
    if (this.selectedTaskId === task._id) {
      // If the same task is clicked again, close the details
      this.selectedTaskId = null;
    } else {
      // Otherwise, fetch task details and display them
      this.http.get(`http://localhost:3300/task/get/${task._id}`).subscribe({
        next: (taskDetails: any) => {
          this.selectedTaskId = taskDetails._id;
        },
        error: (error: any) => {
          // Handle error
          console.error('Error fetching task details:', error);
        },
      });
    }
  }

  private fetchTasks(): void {
    this.http.get<any[]>('http://localhost:3300/task/list').subscribe({
      next: (tasks: any[]) => {
        this.tasks = tasks;
      },
      error: (error: any) => {
        console.error('Error fetching tasks:', error);
      },
    });
  }
}
