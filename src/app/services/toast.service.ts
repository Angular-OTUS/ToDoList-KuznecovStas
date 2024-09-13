import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toasts: string[] = []
  private _toastsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this._toasts)
  toasts$ = this._toastsSubject.asObservable()

  constructor() {
  }


  showToast(message: string) {
    this._toasts.push(message);
    this._toastsSubject.next(this._toasts);
  }

  removeToast(index: number) {
    this._toasts.splice(index, 1);
    this._toastsSubject.next(this._toasts);
  }
}


