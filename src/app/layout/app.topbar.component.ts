import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SessionStorageService } from './session.storage.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    showSidebarIcon: boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private router: Router,public authService: AuthService, private sessionStorageService: SessionStorageService,) { }

    logout() {
        this.authService.logout().subscribe(
            () => {
            // Clear local session or token if necessary
            // Redirect or perform other actions as needed
            },
            error => {
            console.error('Logout failed', error);
            }
        );
    }

    ngOnInit() {
        //this.showSidebarIcon = sessionStorage.length > 0;
        this.sessionStorageService.storageChange$.subscribe(isNotEmpty => {
            if (window.sessionStorage.getItem('draftReport') != null) {
                this.showSidebarIcon = isNotEmpty;
            }
            
        });
    }

}
