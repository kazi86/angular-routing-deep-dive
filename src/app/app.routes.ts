import {Routes} from "@angular/router";
import {TaskComponent} from "./tasks/task/task.component";
import {NoTaskComponent} from "./tasks/no-task/no-task.component";
import {resolveUserName, UserTasksComponent} from "./users/user-tasks/user-tasks.component";
import {NewTaskComponent} from "./tasks/new-task/new-task.component";
import {TasksComponent, userTask} from "./tasks/tasks.component";

export const routes:Routes = [
  {
    path:'',
    component:NoTaskComponent
  },
  {
  path:'user/:userId',
  component:UserTasksComponent,
  data:{
    message : 'Static Data'
  },
  resolve:{
    userName : resolveUserName
  },
  children: [

    {
      path:'tasks',
      component: TasksComponent,
      resolve:{
        userTasks : userTask
      },
      runGuardsAndResolvers:'paramsOrQueryParamsChange'
    },
    {
      path:'tasks/new-tasks',
      component: NewTaskComponent
    },
    {
      path:'**',
      component: NoTaskComponent
    }
  ]
  }
]
