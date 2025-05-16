import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TacService {
  private tac: any;
  private phoneNum: any;

  setTac(tac: any, phoneNum: any) {
    this.tac = tac;
    this.phoneNum = phoneNum;
  }

  getTac() {
    return this.tac;
  }

  getPhoneNum(){
    return this.phoneNum;
  }
}
