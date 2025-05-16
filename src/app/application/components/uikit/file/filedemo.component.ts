import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ServerService } from 'src/app/server-service';
import { Router } from '@angular/router';


@Component({
    templateUrl: './filedemo.component.html',
    styleUrls: ['./filedemo.component.css'],
    providers: [MessageService]
})
export class FileDemoComponent implements OnInit {


 




    headers1 = [
        { label: '', rowspan: 2 },
        { label: '', rowspan: 2 },
        // Add more headers as needed
      ];

      headers2 = [
        { label: 'Data Availability ', rowspan: 2 },
        { label: 'Verification', rowspan: 2 },
       
        // Add more headers as needed
      ];

      dataSourceTable1 = [
         
        { rowHeader: 'Available 2024 vs BoQ Value', column1: 'Not available', column2: 'YES' },
        { rowHeader: 'Project Status', column1: 'Not available', column2: 'NO' },
        { rowHeader: 'PAC Status', column1: 'Error', column2: 'YES' },
        { rowHeader: 'Order Status', column1: 'OK', column2: 'NO'  },
        { rowHeader: 'LOR Work Status', column1: 'OK', column2: 'YES'  },
        
        
      ];


      dataSourceTable2 = [
         
       
        { rowHeader: 'LOR Available in CJ20N', column1: 'Not available', column2: '' },
       
        
      ];


      dataSourceTable3 = [
         
       
        
        { rowHeader: 'In WWPO List?', column1: 'OK', column2: ''  },
       
      ];


      dataSourceTable4 = [
         
       
        
       
        { rowHeader: 'CPQ Batch', column1: '', column2: '' },
       
        
      ];

      dataSourceTable5 = [
         
       
        
       
        
        { rowHeader: 'Require RPKA? (PAC-Assigned-BoQ amount if -ve indicate require)', column1: 'available', column2: '' },
        
      ];


      dataSource2 = [
         
        { rowHeader: 'Project No', column1: 'Txxxx/XXXX'},
        { rowHeader: 'Project Description', column1: 'NRPxxxxxx' },
        { rowHeader: 'LOR ID', column1: 'PG-XXX-XXX-TP'},
        { rowHeader: 'Contract No', column1: 'Xxxxxxx'},
        
      ];

    uploadedFiles: any[] = [];
dataSourceIsVertical: any;
valCheck: string[] = [];
selectedProject: any;
verify: any[] = [];

    constructor(private messageService: MessageService,  private server: ServerService, private router: Router,) {}


    async ngOnInit() {
      
      this.selectedProject = history.state.selectedProject;
      await this.getPRData();
     

  }


  addnewPR(selectedProject: any) {
    this.router.navigate(['/uikit/file'], { state: { selectedProject } });
}



    async getPRData() {
      try {
          let res = await this.server.fetchServer({
              uri: `/pr/pr.php`,
              params:{
                "project_no":this.selectedProject.project_no ,
                "lor_id": this.selectedProject.lor_id
              },
              method: 'GET',
              errorMsg: 'Failed to fetch project',
          });
           this.verify = res['data']["verification"] ?? [];
      } catch (e) {
          console.log(e);
      } finally {
      }
  }



  
  async save() {
    try {
        let res = await this.server.fetchServer({
            uri: `/pr/save-verify-pr.php`,
            params:{
              "project_no":this.selectedProject.project_no ,
              "lor_id": this.selectedProject.lor_id
        
            },
            jsonData:{verification:this.verify},
            method: 'POST',
            errorMsg: 'Failed to save project',
        });
         
    } catch (e) {
        console.log(e);
    } finally {
    }
}



async submit() {
  try {
      let res = await this.server.fetchServer({
          uri: `/pr/verify-pr.php`,
          params:{
            "project_no":this.selectedProject.project_no ,
            "lor_id": this.selectedProject.lor_id
          },
          jsonData:{verification:this.verify},
          method: 'POST',
          errorMsg: 'Failed to submit project',
      });
     
  } catch (e) {
      console.log(e);
  } finally {
  }
}







}
