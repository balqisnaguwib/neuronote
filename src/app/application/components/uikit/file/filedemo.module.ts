import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { FileDemoRoutingModule } from './filedemo-routing.module';
import { FileDemoComponent } from './filedemo.component';
import { MatCardModule } from '@angular/material/card';
import { CheckboxModule } from 'primeng/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms'; // If you're using forms

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FileDemoRoutingModule,
		FileUploadModule,
		MatCardModule,
		CheckboxModule,
		MatSelectModule,
		MatDatepickerModule,
		MatInputModule,
		MatNativeDateModule,
		DropdownModule,
		InputTextModule,
		
	],
	declarations: [FileDemoComponent],
})
export class FileDemoModule { }
