import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/application/service/country.service';
import { Table } from 'primeng/table';
import { saveAs } from 'file-saver';
import { ServerService } from 'src/app/server-service';
import { Router } from '@angular/router';
import {MessageService, ConfirmationService } from 'primeng/api';

@Component({
    templateUrl: './inputdemo.component.html',
    
providers: [MessageService, ConfirmationService]
})
export class InputDemoComponent implements OnInit {
    projectDescription: any;
    
    countries: any[] = [];

    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];

    chatBots: Object[] = [];
    loading: boolean = true;


    valSlider = 50;
    filteredProjects: any[] = [];
    valColor = '#424242';

    valRadio: string = '';
    productDialog: boolean = false;

    valCheck: string[] = [];

    valCheck2: boolean = false;

    valSwitch: boolean = false;

    cities: SelectItem[] = [];

    selectedList: SelectItem = { value: '' };

    selectedDrop: SelectItem = { value: '' };

    selectedMulti: any[] = [];

    valToggle = false;

    paymentOptions: any[] = [];

    valSelect1: string = "";

    valSelect2: string = "";

    listPR: any[] = [];

    selectedProject: any;

    @ViewChild('filter') filter!: ElementRef;
dt1: Table;

    constructor(private countryService: CountryService,  private service: MessageService,   private messageService: MessageService, private confirmationService: ConfirmationService, private server: ServerService, private router: Router) { }

    async ngOnInit() {


        this.chatBots = [
            {
              id: 1,
              chatbot_name: 'TM23413',
             
              chatbot_created_by: 'hshshjajkwkwl122sd'
            },
            {
              id: 2,
              chatbot_name: 'TM89302',
             
              chatbot_created_by: 'osjs840jdhfbs038'
            },
            
          ];
        
        await this.getPRData();
        this.selectedProject = history.state.selectedProject;

       
    }


    verifiedPR(selectedProject: any) {
        this.router.navigate(['/uikit/file'], { state: { selectedProject } });
    }



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

    confirm2(event: Event,chatbot:Object) {
        this.confirmationService.confirm({
            key: 'confirm2',
            target: event.target || new EventTarget,
            message: 'Reset Password?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.resetpassword(chatbot)
                
            },
            reject: () => {
                // this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'Cancel to delete' });
            }
        });

    }



    async resetpassword(chatbot:Object){
        
        try {
           
            let res = await this.server.fetchServer({
                uri: `/chatbot/${chatbot["chatbot_id"]}`,
                method: 'DELETE',
               
                errorMsg: 'Failed to delete'
            })
            if (res['success'] ?? false) {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Chatbot deleted successfully' });
                  // Delay for 2 seconds (adjust as needed)
                setTimeout(() => {
                    this.displayNewPassword();
                }, 1500);

                
            }
            else {
                throw new Error(res['message'] ?? res['detail'] ?? 'Failed to fetch delete')
            }
        }
        catch (e) {
            console.log(e)
        }
        

    }



    async displayNewPassword(){

        try {
           
            let res = await this.server.fetchServer({
                uri: `/chatbot/`,
                method: 'GET',
               
                errorMsg: 'Failed to fetch'
            })
            if (res['success'] ?? false) {
                console.log(res);
                this.chatBots=res["data"]
                 
                
            }
            else {
                throw new Error(res['message'] ?? res['detail'] ?? 'Failed to fetch data')
            }
        }
        catch (e) {
            console.log(e)
        }

            finally {
                this.loading=false
            }
        

    }


    searchChat() {
        // Implement your search logic here using the value from the input field (#filter)
        // console.log("Searching for:", this.filter.value);
        // Add your search logic here
    }


    
    async filterProject(event: any) {
        const query = event.query;
        try {
            let res = await this.server.fetchServer({
                uri: `/project/project-lookup.php?${new URLSearchParams({
                    project_no: query,
                })}`,
                method: 'GET',
                errorMsg: 'Failed to lookup projects',
            });
            let data = res['data'] ?? [];

            this.filteredProjects = data;
        } catch (e) {
            console.log(e);
        } finally {
        }
    }

  async getPRData() {
      try {
          let res = await this.server.fetchServer({
              uri: `/pr/pr.php`,
              params:{
                "status": "PENDING VERIFICATION",
              },
              method: 'GET',
              errorMsg: 'Failed to fetch project',
          });
          this.listPR = res['data'] ?? [];
      } catch (e) {
          console.log(e);
      } finally {
      }
  }





    generateRawReport() {
        const rawReportContent = this.generateRawReportContent(this.chatBots);
    
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
