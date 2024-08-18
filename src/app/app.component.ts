import { Component, Inject, inject, input, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./Pages/home/home.component";
import { SearchComponent } from './Pages/search/search.component';
import { APIResponse, Customer, LoginData } from './models/train';
import { FormsModule } from '@angular/forms';
import { TrainService } from './services/train.service';
import { json } from 'stream/consumers';
import { AsyncLocalStorage } from 'async_hooks';
import { isPlatformBrowser, PlatformLocation } from '@angular/common';
import { privateDecrypt } from 'crypto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MRTBS';

  registerObj: Customer = new Customer();
  trainService = inject(TrainService);
 
  loginObj: LoginData = new LoginData();

loggedUserData: Customer = new Customer();
  constructor(@Inject(PLATFORM_ID) private platformid: object) {
    // const localData = localStorage.getItem('MRTBS');
    // if(localData != null) {
    //   this.loggedUserData = JSON.parse(localData);
    // }
  } 

  onRegister() {
    this.trainService.createNewCustomer(this.registerObj).subscribe((res:APIResponse)=> {
      if(res.result){
        alert("New Registeration Success");
      } else{
        alert(res.message);
      }
    })
  }

  onLogin(){
    this.trainService.getLoginCustomer(this.loginObj).subscribe((res:APIResponse)=> {
      if(res.result && isPlatformBrowser(this.platformid)) {
        alert("Login Success");
        localStorage.setItem('MRTBS', JSON.stringify(res.data));
        this.loggedUserData = res.data;
      } else{
        alert(res.message);
      }
    })
  }

  onLogOff(){
      this.loggedUserData = new Customer();
      localStorage.removeItem("")
  }

  openSingup() {
    const modal = document.getElementById("singUp");
    if(modal != null){
      modal.style.display = 'block'
    }
  }

  openLogin() {
    const modal = document.getElementById("logIn");
    if(modal != null){
      modal.style.display = 'block'
    }
  }

  closeSingup() {
    const modal = document.getElementById("singUp");
    if(modal != null){
      modal.style.display = 'none'
    }
  }

  closeLogin() {
    const modal = document.getElementById("logIn");
    if(modal != null){
      modal.style.display = 'none'
    }
  }

 
}
