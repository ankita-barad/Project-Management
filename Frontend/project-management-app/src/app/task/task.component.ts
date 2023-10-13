import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectListingService } from '../project-listing.service';
import { TaskService } from '../task.service';
import { UserServiceService } from '../user-service.service'; // Import the UserServiceService
import { Router } from '@angular/router'; //

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  projectId: string = '';
  projectName: string = '';
  newTask: any = {};
  editedTask: any = {}; // Initialize an empty object for editing a task
  tasks: any[] = [];
  users: any[] = []; // Array to store the users

  constructor(
    private route: ActivatedRoute,
    private projectListingService: ProjectListingService,
    private taskService: TaskService,
    private userService: UserServiceService, // Inject the UserServiceService
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];

      this.projectListingService.getProjectDetails(this.projectId).subscribe({
        next: (projectDetails) => {
          this.projectName = projectDetails.name;
        },
        error: (error) => {
          console.error('Error fetching project details:', error);
        },
      });
    });
  }

  ngOnInit(): void {
    this.fetchTasks(); // Fetch tasks when the component initializes
    this.fetchUsers(); // Fetch the list of users
  }

  // Define a function to fetch tasks for the specific project
  fetchTasks() {
    this.taskService.getTasks(this.projectId).subscribe({
      next: (tasks: any[]) => {
        this.tasks = tasks;
      },
      error: (error: any) => {
        console.error('Error fetching tasks:', error);
      },
    });
  }

  // Fetch the list of users
  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (users: any[]) => {
        this.users = users;
      },
      error: (error: any) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  addTask() {
    if (this.newTask.title && this.newTask.status && this.newTask.priority) {
      this.newTask.projectID = this.projectId;

      this.taskService.addTask(this.newTask, this.projectId).subscribe(() => {
        this.newTask = {}; // Reset the new task
        this.fetchTasks(); // Fetch updated tasks
      });
    } else {
      console.error('All required fields must be filled in to add a task.');
    }
  }

  // Toggle edit mode for a task
  onEditClick(task: any): void {
    if (this.isEditing(task)) {
      // If already in edit mode, cancel it
      this.cancelEdit();
    } else {
      // If not in edit mode, start editing
      this.editedTask = { ...task }; // Clone the task for editing
    }
  }

  // Check if a task is in edit mode
  isEditing(task: any): boolean {
    return this.editedTask._id === task._id;
  }

  // Update a task
  updateTask(): void {
    this.taskService
      .updateTask(this.projectId, this.editedTask)
      .subscribe(() => {
        // Reset the editedTask object and refresh the task list
        this.editedTask = {};
        this.fetchTasks();
      });
  }

  // Cancel editing and discard changes
  cancelEdit(): void {
    this.editedTask = {};
  }

  // Define a function to delete a task
  deleteTask(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.projectId, taskId).subscribe(() => {
        this.fetchTasks(); // Fetch updated tasks after deletion
      });
    }
  }
  logout() {
    // Perform logout actions here, e.g., clearing user session, etc.

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
