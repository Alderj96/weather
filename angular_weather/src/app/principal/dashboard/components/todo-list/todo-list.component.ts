import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoField = new FormControl('', Validators.required)
  todoList: Todo[] = []

  constructor(
    private todoService: TodoService
  ) {
    this.todoService.todosActives$
    .pipe(tap(data => console.log(data)))
    .subscribe(data => this.todoList = data)
  }

  ngOnInit(): void {
  }

  addTodo() {
    if (!this.todoField.valid) {
      this.todoField.markAsTouched()
      return
    }
    this.todoService.createTodo(this.todoField.value!)
    this.todoField.reset()
  }

  updateFinishTodo(value: Todo) {
    this.todoService.finishTodo(value)
  }

}
