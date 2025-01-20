import {Component, computed, inject, input, OnInit} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import {TasksService} from "./tasks.service";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit{

  public userId = input.required<string>();

  // public order = input<'asc'|'desc'>();

  public order = 'asc';

  public userTasks = computed(()=>{
    return this.taskSvc.allTasks().filter((task)=>{
      return task.userId === this.userId();
    })
  });

  public taskSvc = inject(TasksService);

  private activatedRoute = inject(ActivatedRoute);

  public ngOnInit(){

    this.activatedRoute.queryParams.subscribe({
      next:(data)=>{

        this.userTasks().sort((a,b)=>{

            if(data['order'] === 'asc'){

              this.order = 'asc';

              return a.id > b.id ? 1 : -1;

            }else{

              this.order = 'desc';

              return a.id > b.id ? -1 : 1;

            }

          });
      }
    });
  }

}
