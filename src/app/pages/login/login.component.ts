import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/user.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/core/reservation.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form : FormGroup
  constructor(
    private router : Router,
    private fb : FormBuilder,
    private userService : UserService,
    private toastrService: NbToastrService,
    private reservationService : ReservationService
    ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    });
  }

  attemptAuth(){
    const crendentials = {
      email : this.email.value,
      password : this.password.value
    }
    this.userService.attemptAuth(crendentials).subscribe(result =>{
      this.userService.setAuth(result);
      if(this.reservationService.getCurrentReservationDetails()){
        this.router.navigate(['payments']);
      }else{
        this.router.navigate(['dashboard']);
      }
    },
    err => {
      this.toastrService.show("Les identifiants saisis sont invalides", "Identifiants invalides", {status : "danger"}); 
    })

  } 
  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }
}
