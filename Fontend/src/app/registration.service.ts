import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({});
  }

  addForm(value: FormGroup): void {
    Object.keys(value.controls).forEach(key => {
      this.form.addControl(key, value.get(key))
    })
  }
}
