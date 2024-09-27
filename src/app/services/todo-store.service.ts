import {Injectable} from '@angular/core';
import {TodoTask} from "../interfaces/to-do";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {
  private _apiBaseURL: string = 'http://localhost:3000';
  private _todoItems: TodoTask[] = [];

  private _todoItemsSubject: BehaviorSubject<TodoTask[]> = new BehaviorSubject<TodoTask[]>(this._todoItems);
  todoItems$ = this._todoItemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getAllTasks()
  }

  getAllTasks() {
    this.http.get<TodoTask[]>(this._apiBaseURL + '/todos').subscribe(data => {
      this._todoItems = data;
      this._todoItemsSubject.next(this._todoItems);
    });
    return [...this._todoItemsSubject.value];
  }

  getTaskByStatus(status: string | null) {
    return this._todoItems.filter(item => item.status === status);
  }

  addTask(title: string, description: string) {
    // ищем максимальный id
    const maxId: number = Math.max(...this._todoItems!.map(item => item.id));
    const nextID: number = maxId + 1

    // отправляем на сервер
    this.http.post(this._apiBaseURL + '/todos', {
      id: nextID.toString(),
      title: title,
      description: description,
      status: 'InProgress'
    }).subscribe({
      next: () => {
        this._todoItems?.push({id: nextID, title: title, description: description, status: 'InProgress'})
        this._todoItemsSubject.next(this._todoItems);
      },
      error: (error) => {
        console.error('todo-store-service|deleteTask', error);
        return;
      }
    });


  }

  deleteTask(id: number) {
    // отправляем на сервер
    this.http.delete(this._apiBaseURL + '/todos/' + id).subscribe({
      next: () => {
        this._todoItems = this._todoItems.filter(item => item.id !== id);
        this._todoItemsSubject.next(this._todoItems);
      },
      error: (error) => {
        console.error('todo-store-service|deleteTask', error);
      }
    });
  }

  updateTask(id: number, item: TodoTask) {
    const index = this._todoItems.findIndex(item => item.id === id);
    if (index === -1) {
      console.error(`todo-store-service|deleteTask - Task with id ${id} not found`);
      return;
    }
    this._todoItems[index] = item;
    this._todoItemsSubject.next(this._todoItems)

    // отправляем на сервер
    this.http.put(this._apiBaseURL + '/todos/' + id, item).subscribe();
  }
}
