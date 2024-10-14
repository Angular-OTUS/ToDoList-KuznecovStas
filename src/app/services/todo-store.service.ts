import {Injectable, OnDestroy} from '@angular/core';
import {TodoTask} from "../interfaces/to-do";
import {BehaviorSubject, Observable, of, Subject, takeUntil, tap} from "rxjs";
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TodoStoreService implements OnDestroy {
  public todoItem: TodoTask | undefined;
  private _apiBaseURL: string = 'http://localhost:3000';
  private _todoItems: TodoTask[] = [];
  private _todoItemsSubject: BehaviorSubject<TodoTask[]> = new BehaviorSubject<TodoTask[]>(this._todoItems);
  public todoItems$ = this._todoItemsSubject.asObservable();
  private destroyed$: Subject<void> = new Subject();

  constructor(private http: HttpClient) {
    this.getAllTasks()
  }

  public getTaskByID(id: number): Observable<TodoTask> {
    return this.http.get<TodoTask>(this._apiBaseURL + '/todos/' + id)
      .pipe(takeUntil(this.destroyed$));
  }

  public getAllTasks(): TodoTask[] {
    this.http.get<TodoTask[]>(this._apiBaseURL + '/todos')
      .pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this._todoItems = data;
      this._todoItemsSubject.next(this._todoItems);
    });
    return [...this._todoItemsSubject.value];
  }

  public getTaskByStatus(status: string | null): TodoTask[] {
    return this._todoItems.filter(item => item.status === status);
  }

  public addTask(title: string, description: string): Observable<any> {
    // ищем максимальный id
    const maxId: number = Math.max(...this._todoItems!.map(item => item.id));
    const nextID: number = maxId + 1

    // отправляем на сервер
    return this.http.post(this._apiBaseURL + '/todos', {
      id: nextID.toString(),
      title: title,
      description: description,
      status: 'InProgress'
    }).pipe(
      takeUntil(this.destroyed$),
      tap(() => {
        this._todoItems?.push({id: nextID, title: title, description: description, status: 'InProgress'})
        this._todoItemsSubject.next(this._todoItems);
      })
    );
  }

  public deleteTask(id: number): Observable<any> {
    // отправляем на сервер
    return this.http.delete(this._apiBaseURL + '/todos/' + id)
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => {
          this._todoItems = this._todoItems.filter(item => item.id !== id);
          this._todoItemsSubject.next(this._todoItems);
        })
      );
  }

  public updateTask(id: number, item: TodoTask): Observable<any> {
    const index: number = this._todoItems.findIndex(item => item.id === id);
    if (index === -1) {
      console.error(`todo-store-service|deleteTask - Task with id ${id} not found`);
      return of(null); // Возвращаем Observable с null в случае ошибки
    }
    this._todoItems[index] = item;
    this._todoItemsSubject.next(this._todoItems);
    // отправляем на сервер
    return this.http.put(this._apiBaseURL + '/todos/' + id, item)
      .pipe(
        takeUntil(this.destroyed$)
      );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
