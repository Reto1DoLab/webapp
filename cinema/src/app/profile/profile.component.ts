import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  name: string;
  constructor(private activatedRoute: ActivatedRoute,) {
    this.name = this.activatedRoute.snapshot.params['name'];
   }

  ngOnInit(): void {
  }

}
