import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/application/api/customer';
import { CustomerService } from 'src/app/application/service/customer.service';
import { Product } from 'src/app/application/api/product';
import { ProductService } from 'src/app/application/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/server-service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    templateUrl: './tabledemo.component.html',
    styleUrls: ['./tabledemo.component.css'],
    providers: [MessageService, ConfirmationService]
})
export class TableDemoComponent implements OnInit {

    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;
    chatBots: Object[] = [];
    selectedChatBots: any[] = [];
    valCheck: string[] = [];

    boq: any[] = [];
    selectedBoq: any[] = [];

    @ViewChild('filter') filter!: ElementRef;
city: any;
selectedCity: any;
isSwitchOn: any;
textBoxValue: any;
totalRm: any;
    pr: any;


    constructor(private customerService: CustomerService, private productService: ProductService, private router: Router, private server: ServerService,) { }

    async   ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
        this.pr = history.state.pr;
        await this.getTotalPr();
        this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
        this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];

         this.chatBots = [
            {
              id: 1,
              chatbot_name: '1',
              chatbot_created_dt: '34xxxxxx',
              chatbot_created_by: '49xxxxxx',
              chatbot_rm:'rm1200',
              chatbot_quality :'98xxx',
              chatbot_night_rate:'Pull xxxx',
              chatbot_night_rate2:'',
            },
            {
              id: 2,
              chatbot_name: '2',
              chatbot_created_dt: '',
              chatbot_created_by: '49xxxxxx',
              chatbot_rm:'rm34000',
              chatbot_quality :'96xxx',
              chatbot_night_rate:'Pole xxxxx',
              chatbot_night_rate2:'',
            },
            
          ];
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData?.representative?.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    }
                    else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    expandAll() {
        if (!this.isExpanded) {
            this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    async getTotalPr(){

        try {
            let res = await this.server.fetchServer({
                uri: `/project/boq.php`,
                method: 'POST',
                jsonData: {
                    'project_no': this.pr.project_no,
                    'lor_id': this.pr.lor_id,
                    'file': 'dummy',
                },
                errorMsg: 'Failed to fetch BOQ',
            });
            let data = res['data'] ?? [];
         
            this.boq = data;
        } catch (e) {
            console.log(e);
        } finally {
        }

    }






    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    onRowSelect(event) {
        // Do something with the selected chatbot, if needed
        console.log('Selected Chatbot:', event.data);
      }
    
      // Function to handle row deselection
      onRowUnselect(event) {
        // Do something when a chatbot is deselected, if needed
        console.log('Unselected Chatbot:', event.data);
      }
     return(){ this.router.navigate(['/uikit/list']);}

     submit(){}
}