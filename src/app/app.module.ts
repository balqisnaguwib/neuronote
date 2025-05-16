import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './application/components/notfound/notfound.component';
import { ProductService } from './application/service/product.service';
import { CountryService } from './application/service/country.service';
import { CustomerService } from './application/service/customer.service';
import { EventService } from './application/service/event.service';
import { IconService } from './application/service/icon.service';
import { NodeService } from './application/service/node.service';
import { PhotoService } from './application/service/photo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastServiceModule } from './toast-service/toast-service.module';
import { ToastModule } from 'primeng/toast';
import { ServerService } from './server-service';


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        BrowserAnimationsModule,
        ToastServiceModule,
        ToastModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,ServerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
