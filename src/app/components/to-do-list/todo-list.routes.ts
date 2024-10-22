import {Routes} from '@angular/router';
import {TodoCreateItemComponent} from "../todo-create-item/todo-create-item.component";
import {ToDoItemViewComponent} from "./to-do-item-view/to-do-item-view.component";
import {ToDoEditComponent} from "./to-do-edit/to-do-edit.component";
import {ROUTERS} from "../../constants/routers";


export const todoListRoutes: Routes = [
  {
    path: ROUTERS.ADD_TASK,
    component: TodoCreateItemComponent
  },
  {
    path: ROUTERS.VIEW_TASK_ID,
    component: ToDoItemViewComponent,
    children: [
      {
        path: ROUTERS.EDIT_TASK,
        component: ToDoEditComponent
      }
    ]
  },
];
