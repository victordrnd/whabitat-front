import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/user.service';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
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
      this.toastr.error('Les identifiants saisis sont invalides', 'Identifiants invalides', {
        progressBar : true
      }) 
    })

  } 
  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }
}
