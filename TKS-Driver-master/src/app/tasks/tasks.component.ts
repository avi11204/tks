import { Component, OnInit } from '@angular/core';
import { Tasks } from './tasks.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TasksService]
})
export class TasksComponent implements OnInit {

  selectedTask: Tasks;

  constructor(private taskService: TasksService) { }

  ngOnInit() {
    this.taskService.taskSelected
    .subscribe(
      (task: Tasks) => {
        this.selectedTask = task;
      }
    );
  }

}
