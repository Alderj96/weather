import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateUpdateTodoDTI, Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = `${environment.API_DB_URL}/api`
  private todos = new BehaviorSubject<Todo[]>([])

  todosActives$ = this.todos.asObservable().pipe(
    map(data => data.filter(d => !d.finished))
  )

  todosFinisheds$ = this.todos.asObservable().pipe(
    map(data => data.filter(d => d.finished))
  )

  constructor(
    private http: HttpClient
  ) { }

  getTodosList() {
    this.http.get<Todo[]>(`${this.apiUrl}/todo`)
    .subscribe(data => this.todos.next(data))
  }

  createTodo(description: string) {
    const { value } = this.todos
    this.http.post<CreateUpdateTodoDTI>(`${this.apiUrl}/todo`, { description })
    .pipe(tap(data => {
      console.log('tap create')
      console.log(data)
    }))
    .subscribe(({ todo }) => {
      value.push(todo)
      this.todos.next(value)
    })
  }

  finishTodo({ _id }: Todo) {
    const { value } = this.todos
    this.http.put<CreateUpdateTodoDTI>(`${this.apiUrl}/todo`, { _id })
    .subscribe(({ todo }) => {
      const index = value.findIndex(v => v._id === todo._id)
      value.splice(index, 1, todo)
      this.todos.next(value)
    })
  }
}
