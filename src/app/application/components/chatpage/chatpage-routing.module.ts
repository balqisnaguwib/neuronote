import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatpageComponent } from './chatpage.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ChatpageComponent }
    ])],
    exports: [RouterModule]
})
export class ChatpageRoutingModule { }
