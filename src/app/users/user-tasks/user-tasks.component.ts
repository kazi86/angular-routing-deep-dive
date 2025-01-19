import {Component, computed, inject, Input, input, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";

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

  public userSvc = inject(UsersService);

  // public userName = computed(()=>this.userSvc.users.find(u=>u.id === this.userId())?.name);

  public userName = "";

  public activatedRouteSvc = inject(ActivatedRoute);

  constructor() {}

  public ngOnInit(){

    console.log(this.activatedRouteSvc); //reactive to changes and key=>values are behaviour subjects

    console.log(this.activatedRouteSvc.snapshot); // not reactive to changes after component has been rendered

    this.activatedRouteSvc.paramMap.subscribe({
      next:(data)=>{
        this.userName =
          this.userSvc.users.find(item=>item.id === data.get('userId'))?.name || '';
      }
    })

  }

}
