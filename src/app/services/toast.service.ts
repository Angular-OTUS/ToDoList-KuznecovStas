import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toasts: string[] = []
  private _toastsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this._toasts)
  public toasts$ = this._toastsSubject.asObservable()

  public showToast(message: string) {
    this._toasts.push(message);
    this._toastsSubject.next(this._toasts);
  }

  public removeToast(index: number) {
    this._toasts.splice(index, 1);
    this._toastsSubject.next(this._toasts);
  }
}


