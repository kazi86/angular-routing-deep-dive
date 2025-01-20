import {Component, computed, inject, Input, input, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterState, RouterStateSnapshot
} from "@angular/router";

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
export class UserTasksComponent implements OnInit{

  // @Input({required : true}) userId !:string;

  //you can use the set method as well if you want to
  // perform extra operations each time value of the input changes

  // @Input()set(userId:string){
  //   console.log(userId);
  // }

  // public userId = input.required <string>();

  public message = input<string>();

  public userName = input<string>();

  public userSvc = inject(UsersService);

  // public userName = computed(()=>this.userSvc.users.find(u=>u.id === this.userId())?.name);

  // public userName = "";

  public activatedRouteSvc = inject(ActivatedRoute);

  constructor() {}

  public ngOnInit(){

    this.activatedRouteSvc.data.subscribe({
      next:(data)=>{
        console.log(data);
      }
    });

    console.log('Static data attached to the /user/:userId', this.message());

    console.log(this.activatedRouteSvc); //reactive to changes and key=>values are behaviour subjects

    console.log(this.activatedRouteSvc.snapshot); // not reactive to changes after component has been rendered

  }

}

export const resolveUserName : ResolveFn<string> = (activatedRoute : ActivatedRouteSnapshot,routerState:RouterStateSnapshot)=>
{

  let userSvc = inject(UsersService);

  let userName: string = "";

  let userId = activatedRoute.params['userId'];

  if(userId){

    let user = userSvc.users.find(item=>item.id === userId)

    userName = user.name;

  }

  return userName;

}
