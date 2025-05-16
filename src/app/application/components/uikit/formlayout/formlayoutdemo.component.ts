import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/application/service/country.service';
import { Table } from 'primeng/table';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server-service';

@Component({
    templateUrl: './formlayoutdemo.component.html'
})
export class FormLayoutDemoComponent {

    selectedState: any = null;
    countries: any[] = [];
    filteredCountries: any[] = [];
    listPR: any[] = [];
    selectedProject: any;
    filteredProjects: any[] = [];
    selectedDate: Date;
    name: string = '';
    email: string = '';



    @ViewChild('filter') filter!: ElementRef;
    dt1: Table;

    constructor(private countryService: CountryService,private router: Router,private server: ServerService) { }

    onDateSelect(selectedDate: Date) {
        // Implement filtering or other actions based on the selected date
        console.log('Selected date:', selectedDate);
        // You can perform filtering here
    }


    async ngOnInit() {}


    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';

       
    }
    
    generateRawReport() {
        const rawReportContent = this.generateRawReportContent(this.listPR);
    
        // Convert the content to a Blob
        const blob = new Blob([rawReportContent], { type: 'text/plain' });
    
        // Save the Blob as a file
        saveAs(blob, 'raw_report.txt');
    }
    
    generateRawReportContent(data: any[]): string {
      // Logic to format the data as raw report content
      // This can vary based on your requirements.
      return JSON.stringify(data, null, 2);
    }
    }
