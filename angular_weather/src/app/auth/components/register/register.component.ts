import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserDTO } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MyValidatorRegex, MyValidators } from '../../../utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  signUpError: String | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm()
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      fullname: ['', [Validators.required, Validators.pattern(MyValidatorRegex.fullName)]],
      password: ['', [Validators.required, Validators.pattern(MyValidatorRegex.password)]],
      confirmpassword: ['', [Validators.required]],
    },
    {
      validators: [MyValidators.matchPasswords]
    })
  }

  get usernameField () { return this.form.get('username') }
  get mailField () { return this.form.get('mail') }
  get fullnameField () { return this.form.get('fullname') }
  get passwordField () { return this.form.get('password') }
  get confirmpasswordField () { return this.form.get('confirmpassword') }

  signUp(event: Event) {
    event.preventDefault()
    this.signUpError = null
    if (!this.form.valid) {
      this.form.markAllAsTouched()
      return
    }

    const data: CreateUserDTO = this.form.value

    this.authService.signUp(data)
    .subscribe({
      next: data => {
        this.goToPrincipal()
      },
      error: ({ error, status }) => {
        if (status === 400) this.signUpError = error['message']
      }
    })
  }

  goToPrincipal() {
    this.router.navigate(['/principal'])
  }

}
