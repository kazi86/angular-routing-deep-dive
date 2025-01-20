import {CanMatch, CanMatchFn, RedirectCommand, Router, Routes} from "@angular/router";
import {NoTaskComponent} from "./tasks/no-task/no-task.component";
import {resolveUserName, UserTasksComponent} from "./users/user-tasks/user-tasks.component";
import {NewTaskComponent} from "./tasks/new-task/new-task.component";
import {TasksComponent, userTask, userTaskAddressBar} from "./tasks/tasks.component";
import {inject} from "@angular/core";

export const dummyRouteGuard :CanMatchFn=(route,segments)=>{

  const router = inject(Router);
  const shouldAccess = Math.random();

  if(shouldAccess < 0.5){
    return true;
  }

  return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes:Routes = [
  {
    path:'',
    component:NoTaskComponent
  },
  {
  path:'user/:userId',
  component:UserTasksComponent,
  canMatch:[dummyRouteGuard],
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
      runGuardsAndResolvers:'paramsOrQueryParamsChange',
      title: userTaskAddressBar
    },
    {
      path:'tasks/new-tasks',
      component: NewTaskComponent,
      title:'Create New Tasks',
    },
    {
      path:'**',
      component: NoTaskComponent,
      title:'No Task Selected'
    }
  ]
  }
];


