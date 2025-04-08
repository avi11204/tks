import { Component, OnInit } from '@angular/core';
import { Tasks } from '../tasks.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Tasks[];

  constructor(private taskService: TasksService) { }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

}
