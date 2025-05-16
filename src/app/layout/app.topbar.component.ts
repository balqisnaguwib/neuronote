import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SessionStorageService } from './session.storage.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.css'],
    providers: [MessageService]
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];
    showSidebarIcon: boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService, 
        private router: Router,
        public authService: AuthService, 
        private sessionStorageService: SessionStorageService,
        private messageService: MessageService
    ) { }

    navigateTo(route: string) {
        // Close menu
        this.layoutService.state.profileSidebarVisible = false;
        
        // Navigate
        this.router.navigate([route]);
    }

    logout() {
        this.authService.logout().subscribe(
            () => {
                // Close menu
                this.layoutService.state.profileSidebarVisible = false;
                
                // Show success message
                this.messageService.add({ 
                    severity: 'success', 
                    summary: 'Log Keluar Berjaya', 
                    detail: 'Sesi anda telah ditamatkan',
                    life: 3000
                });
                
                // Clear session data
                sessionStorage.clear();
                
                // Navigate after a short delay
                setTimeout(() => {
                    this.router.navigate(['']);
                }, 1500);
            },
            error => {
                console.error('Logout failed', error);
                
                // Still attempt to logout on client side
                sessionStorage.clear();
                this.router.navigate(['']);
            }
        );
    }

    ngOnInit() {
        //this.showSidebarIcon = sessionStorage.length > 0;
        this.sessionStorageService.storageChange$.subscribe(isNotEmpty => {
            if (window.sessionStorage.getItem('draftReport') != null || 
                window.sessionStorage.getItem('personalInfo') != null) {
                this.showSidebarIcon = isNotEmpty;
            }
        });
        
        // Check initially
        this.showSidebarIcon = window.sessionStorage.getItem('draftReport') != null || 
                               window.sessionStorage.getItem('personalInfo') != null;
    }
}