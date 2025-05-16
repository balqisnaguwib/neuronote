import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SuccessPageComponent } from './success-page.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SuccessPageComponent }
    ])],
    exports: [RouterModule]
})
export class SuccessPageRoutingModule { }