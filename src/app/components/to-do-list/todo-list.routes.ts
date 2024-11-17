import {Routes} from '@angular/router';
import {ROUTERS} from "../../constants/routers";
import {ToDoEditComponent} from "./to-do-edit/to-do-edit.component";


export const todoListRoutes: Routes = [
  {
    path: ROUTERS.ADD_TASK,
    loadComponent: () => import('../todo-create-item/todo-create-item.component').then(m => m.TodoCreateItemComponent)
  },
  {
    path: ROUTERS.VIEW_TASK_ID,
    loadComponent: () => import('./to-do-item-view/to-do-item-view.component').then(m => m.ToDoItemViewComponent),
    //loadChildren: () => import('./to-do-item-view/todo-item-view.routes').then(m => m.todoItemViewRoutes)
    children: [
      {
        path: ROUTERS.EDIT_TASK,
        component: ToDoEditComponent
      }
    ]
  },
];
