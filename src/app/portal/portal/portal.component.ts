import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/auth/auth.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public check(): void {
    this.authService.check().subscribe((x) => console.log(x));
  }

}
