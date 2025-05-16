import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ServerService } from 'src/app/server-service';
import { Toast } from 'primeng/toast';
import { TacService } from '../../service/tac.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [MessageService],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class LoginComponent {
    loadingLogin: boolean = false;
    userId: string = '';
    password: string = '';
    rememberMe: boolean = false;
    valCheck: string[] = ['remember'];

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private server: ServerService,
        private tacService: TacService,
        private messageService: MessageService,
    ) {
        // Try to load remembered user
        const rememberedUser = localStorage.getItem('remembered_user');
        if (rememberedUser) {
            try {
                const userData = JSON.parse(rememberedUser);
                this.userId = userData.userId || '';
                this.rememberMe = true;
            } catch (e) {
                console.error('Error loading remembered user:', e);
            }
        }
    }

    async login() {
        // Validate inputs
        if (!this.userId.trim()) {
            this.messageService.add({ 
                severity: 'warn', 
                summary: 'Maklumat Tidak Lengkap', 
                detail: 'Sila masukkan ID pengguna',
                life: 3000
            });
            return;
        }
        
        if (!this.password.trim()) {
            this.messageService.add({ 
                severity: 'warn', 
                summary: 'Maklumat Tidak Lengkap', 
                detail: 'Sila masukkan kata laluan',
                life: 3000
            });
            return;
        }
        
        try {
            this.loadingLogin = true;
            
            // Save user info if remember me is checked
            if (this.rememberMe) {
                localStorage.setItem('remembered_user', JSON.stringify({ 
                    userId: this.userId
                }));
            } else {
                localStorage.removeItem('remembered_user');
            }
            
            // In a real app, we would validate credentials here
            // For demo, we'll simulate a login delay
            setTimeout(() => {
                this.loadingLogin = false;
                
                // Show success message
                this.messageService.add({ 
                    severity: 'success', 
                    summary: 'Log Masuk Berjaya', 
                    detail: `Selamat datang, ${this.userId}`,
                    life: 2000
                });
                
                // Navigate after a short delay to show the message
                setTimeout(() => {
                    this.router.navigate(['/chatpage']);
                }, 1500);
            }, 1500);
            
        } catch (e) {
            console.log(e);
            this.loadingLogin = false;
            
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Log Masuk Gagal', 
                detail: 'ID pengguna atau kata laluan tidak sah',
                life: 3000
            });
        }
    }
}