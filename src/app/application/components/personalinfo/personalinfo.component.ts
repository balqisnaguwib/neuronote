import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server-service';
import { SessionStorageService } from 'src/app/layout/session.storage.service';
import { trigger, transition, style, animate } from '@angular/animations';

interface PersonalInfo {
    nama: string;
    mykad: string;
    alamat: string;
    poskod: string;
    daerah: string;
    negeri: string;
    jantina: string;
    warganegara: string;
    bangsa: string;
    agama: string;
    telefon: string;
    emel: string;
    tarikhLahir: any;
}

@Component({
    templateUrl: './personalinfo.component.html',
    styleUrls: ['./personalinfo.component.css'],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})

export class PersonalInfoComponent implements OnInit {

    // personal info data
    personalInfo: PersonalInfo = {
        nama: '',
        mykad: '',
        jantina: '',
        warganegara: '',
        alamat: '',
        poskod: '',
        negeri: '',
        daerah: '',
        tarikhLahir: null,
        bangsa: '',
        agama: '',
        telefon: '',
        emel: ''
    };
      
    genderOptions = [
        { label: 'Lelaki', value: 'Lelaki' },
        { label: 'Perempuan', value: 'Perempuan' }    
    ];

    stateOptions = [
        { label: 'Johor', value: 'Johor' },
        { label: 'Melaka', value: 'Melaka' },
        { label: 'Kedah', value: 'Kedah' },
        { label: 'Kelantan', value: 'Kelantan' },
        { label: 'Negeri Sembilan', value: 'Negeri Sembilan' },
        { label: 'Pahang', value: 'Pahang' },
        { label: 'Penang', value: 'Penang' },
        { label: 'Perak', value: 'Perak' },
        { label: 'Perlis', value: 'Perlis' },
        { label: 'Selangor', value: 'Selangor' },
        { label: 'Terengganu', value: 'Terengganu' },
        { label: 'Sabah', value: 'Sabah' },
        { label: 'Sarawak', value: 'Sarawak' },
        { label: 'Wilayah Persekutuan Kuala Lumpur', value: 'Wilayah Persekutuan Kuala Lumpur' },
        { label: 'Putrajaya', value: 'Putrajaya' },
        { label: 'Labuan', value: 'Labuan' }
    ]

    selectedFileName: string = '';
    uploadedFile: any;
    loadingState: boolean = false;
    
    // Progress tracking variables
    progressValue: number = 0;
    progressStages: string[] = [
      'Memulakan muat naik...', 
      'Memproses imej...', 
      'Mengekstrak teks...', 
      'Menganalisa maklumat...',
      'Memuatkan data...'
    ];
    currentStage: number = 0;
    progressInterval: any;
    
    constructor(
        private router: Router, 
        private server: ServerService, 
        private sessionStorageService: SessionStorageService, 
        private messageService: MessageService
    ) { }

    async ngOnInit() {
        if (window.sessionStorage.getItem('personalInfo')) {
            this.personalInfo = JSON.parse(window.sessionStorage.getItem('personalInfo'));
            this.uploadedFile = true; // Set as true if data already exists
        }
    }

    onFileSelect(event: any) {
        const file = event.files?.[0];
        if (file) {
            this.selectedFileName = file.name;
        }
    }

    // Reset progress state
    resetProgress() {
        this.progressValue = 0;
        this.currentStage = 0;
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    // Start the progress simulation
    startProgressSimulation() {
        this.resetProgress();
        
        // Set initial progress to make the progress bar visible immediately
        this.progressValue = 1;
        
        // We'll simulate progress by updating every 180ms for a smooth effect
        this.progressInterval = setInterval(() => {
            // Increment progress based on current stage
            if (this.currentStage < this.progressStages.length - 1) {
                // Each stage goes from 0 to 20% (5 stages total = 100%)
                const stageProgress = (this.progressValue % 20) + 1; // Increment by 1% each time
                
                if (stageProgress >= 20) {
                    // Move to next stage
                    this.currentStage++;
                    this.progressValue = this.currentStage * 20;
                } else {
                    this.progressValue = (this.currentStage * 20) + stageProgress;
                }
            } else {
                // Final stage - complete it more slowly
                if (this.progressValue < 99) {
                    this.progressValue += 1;
                    if (this.progressValue > 99) this.progressValue = 99;
                }
            }
        }, 180);
    }

    // Function to get the current progress stage text
    getCurrentStageText(): string {
        return this.progressStages[this.currentStage];
    }

    async customUpload(event: any) {
        this.loadingState = true;
        this.uploadedFile = null; // Reset to show progress
        console.log('File upload event:', event);
        const file = event.files[0];
        
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                // Start progress tracking
                this.startProgressSimulation();
                
                const response = await fetch('https://llm.nnoc.cloud:8842/neuranotelima/character_recognition/', {
                    method: 'POST',
                    headers: {
                        'x-api-key': 'sdvW398493llweih4jnIsfNVEIOsdfdsN349058JLKNdewfdWsdBEFJKBSDDF'
                    },
                    body: formData
                });
                
                // Stop progress simulation
                clearInterval(this.progressInterval);
                this.progressValue = 100; // Set to 100% when done
                
                if (response.ok) {
                    let res = await response.json();
                    this.personalInfo = {
                        ...this.personalInfo, // default values
                        ...JSON.parse(res['recognition'])
                    };
                    
                    // Format date from MyKad number
                    this.personalInfo.tarikhLahir = new Date(
                        parseInt(this.personalInfo.mykad.substring(0, 2)) + 2000, 
                        parseInt(this.personalInfo.mykad.slice(2, 4), 10) - 1, 
                        parseInt(this.personalInfo.mykad.slice(4, 6), 10)
                    );
                    
                    // If year seems to be in the future, assume it's from the 1900s
                    if (this.personalInfo.tarikhLahir.getFullYear() > new Date().getFullYear()) {
                        this.personalInfo.tarikhLahir.setFullYear(this.personalInfo.tarikhLahir.getFullYear() - 100);
                    }
                    
                    // After a short delay to show 100% completion, set uploadedFile to true
                    setTimeout(() => {
                        this.uploadedFile = true;
                        this.loadingState = false;
                    }, 500);
                    
                    console.log('Extracted Info:', this.personalInfo);
                    this.messageService.add({ 
                        severity: 'success', 
                        summary: 'Berjaya', 
                        detail: 'Maklumat daripada MyKad berjaya diekstrak.',
                        life: 3000
                    });
                } else {
                    this.loadingState = false;
                    this.messageService.add({ 
                        severity: 'error', 
                        summary: 'Ralat', 
                        detail: 'Gagal mengekstrak maklumat. Sila cuba lagi.',
                        life: 3000
                    });
                }
            } catch (error) {
                // Reset progress on error
                clearInterval(this.progressInterval);
                this.progressValue = 0;
                this.loadingState = false;
                
                console.error('Error uploading MyKad:', error);
                this.messageService.add({ 
                    severity: 'error', 
                    summary: 'Ralat', 
                    detail: 'Masalah sambungan ke pelayan. Sila cuba lagi.',
                    life: 3000
                });
            }
        } else {
            this.loadingState = false;
            this.messageService.add({ 
                severity: 'warn', 
                summary: 'Amaran', 
                detail: 'Sila pilih satu gambar',
                life: 3000
            });
            return;
        }
    }
    
    submitPersonalInfo() {
        // Validate required fields
        const requiredFields = ['nama', 'mykad', 'jantina', 'warganegara', 'alamat', 'poskod', 'negeri', 'daerah', 'telefon'];
        const missingFields = requiredFields.filter(field => !this.personalInfo[field]);
        
        if (missingFields.length > 0) {
            this.messageService.add({ 
                severity: 'warn', 
                summary: 'Maklumat Tidak Lengkap', 
                detail: 'Sila lengkapkan semua maklumat yang diperlukan',
                life: 3000
            });
            return;
        }
        
        // Validate MyKad format
        const mykadPattern = /^\d{6}-\d{2}-\d{4}$/;
        if (!mykadPattern.test(this.personalInfo.mykad)) {
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Format Tidak Sah', 
                detail: 'Format MyKad tidak sah. Gunakan format XXXXXX-XX-XXXX',
                life: 3000
            });
            return;
        }
        
        // Validate phone number
        const phonePattern = /^(01[0-9])-?\d{7,8}$/;
        if (!phonePattern.test(this.personalInfo.telefon)) {
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Format Tidak Sah', 
                detail: 'Nombor telefon tidak sah. Gunakan format 01X-XXXXXXX',
                life: 3000
            });
            return;
        }
        
        console.log('Submitted Info:', this.personalInfo);
        window.sessionStorage.setItem('personalInfo', JSON.stringify(this.personalInfo));
        this.sessionStorageService.updateStatus();
        
        this.messageService.add({ 
            severity: 'success', 
            summary: 'Maklumat Disimpan', 
            detail: 'Maklumat peribadi anda telah disimpan',
            life: 1500
        });
        
        // Wait for toast message before navigating
        setTimeout(() => {
            this.router.navigate(['/chatpage']);
        }, 1800);
    }
}