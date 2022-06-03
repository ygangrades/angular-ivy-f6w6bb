import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { ValidateTemplate } from './shared/template.validator';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  subject: Subject<void> = new Subject();
  title = 'My Angular Form Validation Example';
  myForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createForm();
    this.subject.pipe(debounceTime(500)).subscribe(() => {
      this.myForm.controls.username.setValidators([
        Validators.required,
        ValidateTemplate,
      ]);
      this.myForm.controls.username.updateValueAndValidity();
    });
  }
  createForm() {
    this.myForm = this.fb.group({
      username: [''],
    });
  }

  onKeyUp(): void {
    console.log('Key up');
    this.subject.next();
  }

  onKeyDown(): void {
    console.log('Key down');
    // When the user starts to type, remove the validator
    this.myForm.controls.username.clearValidators();
  }
}
