import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegistrationService } from '../registration.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  reg1: FormGroup;
  log: FormGroup;
  submitted: boolean;
  message: string;

  constructor(private authService: AuthService, private fb: FormBuilder, private regService: RegistrationService, private router: Router) {
    this.submitted = false;
    this.message = '';
    this.reg1 = fb.group({
      type: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[- +()0-9]{6,}')]]
    });
    this.log = fb.group({
      login: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  firstStep(form: FormGroup): boolean {
    this.regService.addForm(form);
    this.router.navigate(['/reg'])
    return false;
  }

  login(value: Object): boolean {
    console.log(value);
    this.authService.login(value)
    .subscribe({
      next: data => {
        this.authService.saveToken(data);
        this.message = data.body?.message || 'Something went wrong!';
      },
      error: err => {
        this.message = err.error.message;
      },
      complete: () => {
        this.submitted = true;
        setTimeout(() => {
          if(this.authService.isLogged()) this.router.navigate(['/bids']);
          this.submitted = false;
          this.message = '';
        }, 5000);
      }
    });
    return false;
  }

}
