import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './application/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            redirectTo: 'personalinfo', // Redirect base path to 'personalinfo'
                            pathMatch: 'full'
                        },
                        {
                            path: 'personalinfo',
                            loadChildren: () =>
                                import(
                                    './application/components/personalinfo/personalinfo.module'
                                ).then((m) => m.PersonalInfoModule),
                        },
                        {
                            path: 'chatpage',
                            loadChildren: () =>
                                import(
                                    './application/components/chatpage/chatpage.module'
                                ).then((m) => m.ChatpageModule),
                        },
                        {
                            path: 'dashboard',
                            loadChildren: () =>
                                import(
                                    './application/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'success', // New success page route
                            loadChildren: () =>
                                import(
                                    './application/components/success/success-page.module'
                                ).then((m) => m.SuccessPageModule),
                        },
                    ],
                },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}