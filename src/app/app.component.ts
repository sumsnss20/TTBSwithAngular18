import { Component, inject, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./Pages/home/home.component";
import { SearchComponent } from './Pages/search/search.component';
import { APIResponse, Customer } from './models/train';
import { FormsModule } from '@angular/forms';
import { TrainService } from './services/train.service';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MRTBS';

  // registerObj: Customer = new Customer();
  // trainService = inject(TrainService);
 
  // loginObj: any = {
  //   "phone": "",
  //   "password": ""
  // }
//   loggedUser: Customer = new Customer();
// constructor(){
//   const localData =  localStorage.getItem('trainApp');
// }

// loggedUserData: any;
//   constructor() {
//     const localData = localStorage.getItem("trainApp");
//     if(localData != null) {
//       this.loggedUserData = JSON.stringify(localData);
//     }
//   }

  // onRegister() {
  //   this.trainService.createNewCustomer(this.registerObj).subscribe((res:APIResponse)=> {
  //     if(res.result){
  //       alert("New Registeration Success");
  //     } else{
  //       alert(res.message);
  //     }
  //   })
  // }

  // onLogin(){
  //   this.trainService.getLoginCustomer(this.loginObj).subscribe((res:APIResponse)=> {
  //     if(res.result) {
  //       alert("Login Success");
  //       localStorage.setItem('trainApp', JSON.stringify(res.data));
  //       // this.loggedUserData = res.data
  //     } else{
  //       alert(res.message);
  //     }
  //   })
  // }

  // onLogOff(){
  //     this.loggedUserData = new Customer();
  //     localStorage.removeItem("")
  // }

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
