import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServerService } from 'src/app/server-service';
import { Toast } from 'primeng/toast';
import { TacService } from '../../service/tac.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    loadingLogin: boolean = false;
    userId: any;
    valCheck: string[] = ['remember'];
    password!: string;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private server: ServerService,
        private tacService: TacService,
        private messageService: MessageService,
    ) {}

    async login() {
        try {
            this.router.navigate(['/chatpage']);
        } catch (e) {
            console.log(e);
        } finally {
            this.loadingLogin = false;
        }

       
    }
}
