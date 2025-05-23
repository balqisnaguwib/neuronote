import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ToastModule,
    ],
    providers: [MessageService],
})
export class ToastServiceModule {
    constructor(private messageService: MessageService) {
    }

    show(message): void {
        this.messageService.add(message);
    }
}
