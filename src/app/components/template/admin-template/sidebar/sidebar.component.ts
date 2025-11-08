import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDivider, MatListItem, MatNavList } from '@angular/material/list';
import { MatDrawer, MatDrawerContent, MatDrawerContainer } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MatToolbar } from "@angular/material/toolbar";
import { SidebarService } from '../../../../services/sidebar-service';

@Component({
  selector: 'app-sidebar',
  imports: [MatNavList, MatListItem, RouterLink,MatDivider, MatDrawerContainer, MatDrawer, MatToolbar, MatDrawerContent, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  @ViewChild("drawer") public drawer!: MatDrawer;

  constructor(private sidebarService: SidebarService) {

  }

  ngOnInit(): void {
    this.sidebarService.sideNavToggleSubject.subscribe(
      () => { 
        this.drawer?.toggle();
      }
    )
  }

}