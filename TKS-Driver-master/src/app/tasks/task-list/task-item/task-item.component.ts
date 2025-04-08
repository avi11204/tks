import { Component, Input, OnInit } from '@angular/core';
import { Tasks } from '../../tasks.model';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  
  @Input() task: Tasks;
  
  constructor(private taskService:TasksService) { }

  ngOnInit(): void {
  }

  onSelected() {
    this.taskService.taskSelected.emit(this.task);
  }

}
