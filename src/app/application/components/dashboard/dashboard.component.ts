import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [MessageService, ConfirmationService],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class DashboardComponent implements OnInit {

    draftReportList: any = {
        tarikh_kejadian: '',
        masa_kejadian: '',
        lokasi_kejadian: '',
        keterangan_kejadian: '',
        laporan_polis: '',
    };
    draftReport: string = '';
    personalInfo: any = {
        nama: '',
        mykad: '',
        tarikhLahir: null,
        jantina: '',
        warganegara: '',
        bangsa: '',
        agama: '',
        telefon: '',
        alamat: '',
        poskod: '',
        negeri: '',
        daerah: '',
        emel: ''
    };
    saveMessage: string = '';
    showSuccess: boolean = false;
    visible: boolean = false;
    isSubmitting: boolean = false;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router,
        public http: HttpClient,
        private cdr: ChangeDetectorRef
    ) { }

    async ngOnInit() {
        // Load personal info and draft report from session storage
        try {
            if (window.sessionStorage.getItem('personalInfo')) {
                this.personalInfo = JSON.parse(window.sessionStorage.getItem('personalInfo'));
            } else {
                // Redirect to personal info page if no data exists
                this.messageService.add({ 
                    severity: 'warn', 
                    summary: 'Tiada Maklumat', 
                    detail: 'Sila lengkapkan maklumat peribadi terlebih dahulu',
                    life: 3000
                });
                setTimeout(() => {
                    this.router.navigate(['/personalinfo']);
                }, 2000);
                return;
            }
            
            if (window.sessionStorage.getItem('draftReport')) {
                this.draftReportList = JSON.parse(window.sessionStorage.getItem('draftReport'));
                this.draftReport = this.draftReportList.laporan_polis || '';
            } else {
                // Redirect to chat page if no report exists
                this.messageService.add({ 
                    severity: 'warn', 
                    summary: 'Tiada Laporan', 
                    detail: 'Sila buat laporan terlebih dahulu',
                    life: 3000
                });
                setTimeout(() => {
                    this.router.navigate(['/chatpage']);
                }, 2000);
                return;
            }
        } catch (error) {
            console.error('Error loading data:', error);
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Ralat', 
                detail: 'Masalah mendapatkan maklumat',
                life: 3000
            });
        }
    }

    updateReport() {
        // Update report in draftReportList
        this.draftReportList.laporan_polis = this.draftReport;
        
        // Save to session storage
        window.sessionStorage.setItem('draftReport', JSON.stringify(this.draftReportList));
        
        // Close dialog and show success message
        this.visible = false;
        this.messageService.add({ 
            severity: 'success', 
            summary: 'Berjaya', 
            detail: 'Laporan berjaya dikemaskini',
            life: 3000
        });
    }

    async sendReport() {
        // Prevent multiple submissions
        if (this.isSubmitting) return;
        this.isSubmitting = true;
        
        try {
            // Confirm before submission
            this.confirmationService.confirm({
                message: 'Adakah anda pasti untuk menghantar laporan ini?',
                header: 'Pengesahan Penghantaran',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Ya, Hantar',
                rejectLabel: 'Batal',
                accept: () => {
                    // Simulate API call to submit report
                    setTimeout(() => {
                        console.log('Report submitted:', this.draftReport);
                        // Show success message with animation
                        this.messageService.add({ 
                            severity: 'success', 
                            summary: 'Laporan Berjaya Dihantar', 
                            detail: 'Laporan polis anda telah dihantar dan disimpan',
                            life: 5000
                        });
                        
                        // Update session storage if needed
                        this.draftReportList.laporan_polis = this.draftReport;
                        window.sessionStorage.setItem('draftReport', JSON.stringify(this.draftReportList));
                        
                        // Reset submission flag
                        this.isSubmitting = false;
                        
                        // Show completion screen or navigate to another page after delay
                        setTimeout(() => {
                            // Here you could navigate to a confirmation page or reset the app
                            // For now, we'll just reset and go back to personal info
                            window.sessionStorage.removeItem('draftReport');
                            this.router.navigate(['/personalinfo']);
                        }, 3000);
                    }, 1500);
                },
                reject: () => {
                    // Reset submission flag on cancel
                    this.isSubmitting = false;
                }
            });
        } catch (error) {
            console.error('Error submitting report:', error);
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Ralat', 
                detail: 'Masalah menghantar laporan. Sila cuba lagi',
                life: 3000
            });
            this.isSubmitting = false;
        }
    }
}