import { storage } from './../../shared/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private db:storage) { }

  compras: any;

  get() {
    var obj
    this.db.get("Item").then((res:any) =>{
      if(res != null || res != undefined) {
        this.compras = res
        console.log(this.compras  )
      }
    })
  }

  ngOnInit() {
    this.get()
  }

}
