import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/auth/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
