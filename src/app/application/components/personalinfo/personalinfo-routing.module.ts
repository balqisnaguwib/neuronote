import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonalInfoComponent } from './personalinfo.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PersonalInfoComponent }
	])],
	exports: [RouterModule]
})
export class PersonalInfoRoutingModule { }
