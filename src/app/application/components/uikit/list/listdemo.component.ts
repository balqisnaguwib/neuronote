import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/application/api/product';
import { ProductService } from 'src/app/application/service/product.service';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server-service';

@Component({
    templateUrl: './listdemo.component.html',
    styleUrls: ['./listdemo.component.css'],
})
export class ListDemoComponent implements OnInit {
    products: Product[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];
    orderCities2: any[] = [];
    projectDescription: any;
    scrollableCities: any;
    selectedProject: any;
    selectedPr:any;
    listPR: any[] = [];

    constructor(
        private router: Router,
        private productService: ProductService,
        private server: ServerService
    ) {}

   async ngOnInit() {
        this.productService
            .getProducts()
            .then((data) => (this.products = data));
        this.selectedProject = history.state.selectedProject;
        await this.getPRData();
        this.sourceCities = [
            { name: ' Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' },
        ];

        this.targetCities = [];

        this.orderCities = [
            { name: 'PG-XXX-XXX-TP', code: 'SF' },
            { name: 'PG-XXX-XXX-TP', code: 'LDN' },
            { name: 'PG-XXX-XXX-TP', code: 'PRS' },
            { name: 'PG-XXX-XXX-TP', code: 'PRS' },
            { name: 'PG-XXX-XXX-TP', code: 'PRS' },
            { name: 'PG-XXX-XXX-TP', code: 'PRS' },
            { name: 'PG-XXX-XXX-TP', code: 'PRS' },
        ];

        this.orderCities2 = [
            { name: 'FILE NAME :BoQ1', code: 'SF' },
            { name: 'FILE NAME :BoQ2', code: 'SF' },
            { name: 'FILE NAME :BoQ3', code: 'SF' },
            { name: 'FILE NAME :BoQ4', code: 'SF' },
            { name: 'FILE NAME :BoQ5', code: 'SF' },
            { name: 'FILE NAME :BoQ6', code: 'SF' },
        ];

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' },
        ];
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }


    async getPRData() {
        try {
            let res = await this.server.fetchServer({
                uri: `/project/project-lor.php?${new URLSearchParams({
                    project_no: this.selectedProject['project_no'],
                })}`,
                method: 'GET',
                errorMsg: 'Failed to fetch project',
            });
             this.listPR = res['data'] ?? [];
        } catch (e) {
            console.log(e);
        } finally {
        }
    }



    generateDownloadFileName(city: any): string {
        // Replace this with the logic to generate the download file name based on city
        // For example, you can use the city name or any other property
        return `extracted_${city.name}.txt`;
    }

    proceed() {
        this.router.navigate(['/uikit/table'], { state: { pr:this.selectedPr } });
    }

    returnAction() {
        this.router.navigate(['/dashboard']);
    }
}
