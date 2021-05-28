import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {


  public currentScoreSubject: BehaviorSubject<any>;
  public currentScore: Observable<any>;

  constructor() {    
    
    this.currentScoreSubject = new BehaviorSubject<any>(localStorage.getItem('score'));
    this.currentScore = this.currentScoreSubject.asObservable();

    console.log(this.currentScoreValue);
    
    
    if(this.currentScoreValue == null){
      localStorage.setItem('score', '0')
      this.currentScoreSubject.next('0')
    }

  }
  
  public get currentScoreValue(): any {
    return this.currentScoreSubject.value;
  }

}
