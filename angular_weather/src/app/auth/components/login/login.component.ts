import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  signInError: String | null = null;

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
      password: ['', [Validators.required]],
      remindme: [false],
    })
  }

  get usernameField () {
    return this.form.get('username')
  }

  get passwordField () {
    return this.form.get('password')
  }

  logIn(event: Event) {
    event.preventDefault()
    this.signInError = null
    if (!this.form.valid) {
      this.form.markAllAsTouched()
      return
    }

    const { username, password, remindme } = this.form.value

    this.authService.signIn(username, password, remindme)
    .subscribe({
      next: data => {
        this.goToPrincipal()
      },
      error: ({ error, status }) => {
        if (status === 400) this.signInError = error['message']
      }
    })
  }

  goToPrincipal() {
    this.router.navigate(['/principal'])
  }

}
