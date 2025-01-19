import {Component, computed, inject, input} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import {TasksService} from "./tasks.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {

  public userId = input.required<string>();

  public order = input<string>();

  public taskSvc = inject(TasksService);

  public userTasks = computed(()=>{
   return this.taskSvc.allTasks().filter((task)=>{
      return task.userId === this.userId();
    })
  });
}
