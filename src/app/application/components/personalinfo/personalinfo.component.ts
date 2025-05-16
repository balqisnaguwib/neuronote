import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server-service';
import { SessionStorageService } from 'src/app/layout/session.storage.service';


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
})

export class PersonalInfoComponent {

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
    constructor(private router: Router, private server: ServerService, private sessionStorageService: SessionStorageService, private messageService: MessageService,) { }


    async ngOnInit() {
        if (window.sessionStorage.getItem('personalInfo')) {
            this.personalInfo = JSON.parse(window.sessionStorage.getItem('personalInfo'));
        }
    }

    

    onFileSelect(event: any) {
        const file = event.files?.[0];
        if (file) {
            this.selectedFileName = file.name;
        }
    }

    async customUpload(event: any) {
        this.loadingState = true;
        this.uploadedFile = event.files[0].name;
        console.log('File upload event:', event);
        const file = event.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('https://llm.nnoc.cloud:8842/neuranotelima/character_recognition/', {
                method: 'POST',
                headers: {
                    //'Content-Type': 'multipart/form-data',
                    'x-api-key': 'sdvW398493llweih4jnIsfNVEIOsdfdsN349058JLKNdewfdWsdBEFJKBSDDF'
                },
                body: formData
            })
            if (response.ok){
                let res = await response.json();
                this.personalInfo = {
                    ...this.personalInfo, // default values
                    ...JSON.parse(res['recognition'])
                };
                this.personalInfo.tarikhLahir = new Date(parseInt(this.personalInfo.mykad.substring(0, 2)), 
                                                    parseInt(this.personalInfo.mykad.slice(2, 4), 10)-1, 
                                                    parseInt(this.personalInfo.mykad.slice(4, 6), 10));
                console.log('Extracted Info:', this.personalInfo);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Maklumat berjaya diekstrak.' });
                this.loadingState = false;
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Gagal mengekstrak maklumat.' });
            }
        } else {
            alert('Sila pilih satu gambar');
            return;
        }
    }
    
    submitPersonalInfo() {
        console.log('Submitted Info:', this.personalInfo);
        window.sessionStorage.setItem('personalInfo', JSON.stringify(this.personalInfo));
        this.sessionStorageService.updateStatus();
        this.router.navigate(['/chatpage']);
        // You can call a service or perform validation here
    }
    
}
