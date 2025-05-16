import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import {MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
    templateUrl: './dashboard.component.html',
    providers: [MessageService, ConfirmationService]
  
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

    constructor(
        private messageService: MessageService,
        private router: Router,
        public http: HttpClient,
        private cdr: ChangeDetectorRef
    ) { }


    async ngOnInit() {
        this.personalInfo = JSON.parse(window.sessionStorage.getItem('personalInfo'));
        this.draftReportList = JSON.parse(window.sessionStorage.getItem('draftReport'));
        this.draftReport = this.draftReportList.laporan_polis;
    }

    async sendReport() {
        console.log('Report submitted:', this.draftReport);
        this.showSuccess = true; // show message
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Laporan Berjaya Dihantar' });
        this.draftReportList.laporan_polis = this.draftReport;
        console.log(this.draftReport);
        this.visible = false;
    }
    
}
   

   





    
