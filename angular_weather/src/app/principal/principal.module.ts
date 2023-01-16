import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { LayoutComponent } from './layout/layout.component';
import { InitialsPipe } from '../pipes/initials.pipe';
import { TimezonePipe } from '../pipes/timezone.pipe';
import { ClockComponent } from './dashboard/components/clock/clock.component';
import { TodoListComponent } from './dashboard/components/todo-list/todo-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavComponent,
    DashboardComponent,
    UsersListComponent,
    LayoutComponent,
    InitialsPipe,
    TimezonePipe,
    ClockComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    ReactiveFormsModule
  ]
})
export class PrincipalModule { }
