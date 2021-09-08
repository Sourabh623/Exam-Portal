import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public _toast:ToastrService) { }

  ngOnInit(): void {
  }
  show(){
    this._toast.success("Toast is added","Added")
  }
  panelOpenState = false;

}
