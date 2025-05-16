import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private storageChange = new BehaviorSubject<boolean>(sessionStorage.length > 0);
  storageChange$ = this.storageChange.asObservable();

  updateStatus() {
    this.storageChange.next(sessionStorage.length > 1);
  }
}