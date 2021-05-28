import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  winUser : boolean = false;
  winSys : boolean = false;

  result : boolean = false;
  loading : boolean = false;

  numUser : number = 0;
  numSys : number = 0;

  targetUser : string = '';
  targetSys : string = '';

  currentScore : any = 0;

  score : any
  
  
  constructor(
    private spinner: NgxSpinnerService,
    private localService: LocalService,
    private modalService: NgbModal
  ){

    this.score = this.localService.currentScoreSubject;

    this.getScore()

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide()
    }, 1200);

  }

  getScore(){
    
    this.localService.currentScore.subscribe(
      res=>{
        if(res){
          this.currentScore = res
        }else{
          this.currentScore = 0
        }
      }
    )

  } 

  resetAll(){

    this.loading = true;
    this.spinner.show()
    
    this.result = false;
    this.winUser = false
    this.winSys = false
    this.numUser = 0
    this.numSys = 0
    this.targetUser = ''
    this.targetSys = ''

    setTimeout(() => {      
      this.loading = false;
      this.spinner.hide()
    }, 800);

  }


  play(type : number){

    this.loading = true;
    this.spinner.show()

    this.numUser = type;

    if(type == 1){ this.targetUser = 'hand' }
    if(type == 2){ this.targetUser = 'scissors' }
    if(type == 3){ this.targetUser = 'rock' }


    var sysNum = this.getRandom()
    console.log('NUMERO RANDOM SISTEMA : ' + sysNum);

    if(sysNum == 1){ this.targetSys = 'hand' }
    if(sysNum == 2){ this.targetSys = 'scissors' }
    if(sysNum == 3){ this.targetSys = 'rock' }


    this.numSys = sysNum;
    
    this.win(type, sysNum)

  }

  // 1. Papel
  // 2. Tigeras
  // 3. Piedra  

  win(user : number, system : number){

    this.result = true;

    //EMPATE
    if(user == system){
      this.winUser = true;
      this.winSys = true;
    }
    
    if(user == 1 && system == 2){
      this.winUser = false;
      this.winSys = true;
    }
    
    if(user == 1 && system == 3){
      this.winUser = true;
      this.winSys = false;
    }
    
    if(user == 2 && system == 3){
      this.winUser = false;
      this.winSys = true;
    }
    
    
    if(system == 1 && user == 2){
      this.winUser = true;
      this.winSys = false;
    }
    
    if(system == 1 && user == 3){
      this.winUser = false;
      this.winSys = true;
    }
    
    if(system == 2 && user == 3){
      this.winUser = true;
      this.winSys = false;
    }

    console.log('USUARIO : ' + this.winUser);
    console.log('SYSTEMA : ' + this.winSys);

    this.setLocal()

    setTimeout(() => {      
      this.loading = false;
      this.spinner.hide()
    }, 800);

  }

  setLocal(){
        
    var numLocal = parseInt(this.localService.currentScoreValue)

    if(this.winUser && !this.winSys){
      
      numLocal+=1;
      localStorage.setItem('score', numLocal.toString())
      this.localService.currentScoreSubject.next(numLocal.toString())
    }else{

      if(!this.winUser && this.winSys){  
        if(numLocal > 0){
          numLocal-=1;
          localStorage.setItem('score', numLocal.toString())
          this.localService.currentScoreSubject.next(numLocal.toString())
        }
      }

    }
  }

  getRandom(){
    return Math.round((Math.random() * (3 - 1) + 1));
  }

  open(content :any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

}
