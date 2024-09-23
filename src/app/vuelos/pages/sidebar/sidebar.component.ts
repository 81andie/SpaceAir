import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{


  public isSidebarVisible:boolean = true;
  ngOnInit(): void {
    console.log('ngOnInit')
  }
}

    