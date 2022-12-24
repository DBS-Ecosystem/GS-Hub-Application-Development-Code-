import { Component } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent {
  reg2: FormGroup;
  submitted: boolean;
  message: string;

  constructor(private fb: FormBuilder, private regService: RegistrationService, private authService: AuthService, private router: Router) {
    this.submitted = false;
    this.message = '';
    this.reg2 = fb.group({
      login: ['', [Validators.minLength(6), Validators.maxLength(50), Validators.required]],
      password: ['', [Validators.min(6), Validators.required]],
      email: ['', [Validators.email, Validators.minLength(6), Validators.maxLength(50), Validators.required]],
      name: ['', [Validators.maxLength(20), Validators.required]],
      surname: ['', [Validators.maxLength(20), Validators.required]],
      country: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  signup(value: FormGroup) {
    this.regService.addForm(value);
    this.authService.register(this.regService.form.value)
    .subscribe({
      next: data => {
        this.message = data.body?.message || 'Something went wrong!';
      },
      error: err => {
        this.message = err.error.message;
      },
      complete: () => {
        this.submitted = true;
        setTimeout(() => {
          this.router.navigate(['/sign']);
          this.submitted = false;
          this.message = '';
        }, 5000);
      }
    });
  }

}
