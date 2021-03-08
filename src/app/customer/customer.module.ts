import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
// import { PageHeaderComponent } from '../shared/modules/page-header/page-header.component';
// import { PageFooterComponent } from '../shared/modules/page-footer/page-footer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import {
    MatSnackBarModule,
    MatTable,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
    MatCardModule,
    MatCard,
    MatIconModule
} from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import { DialogTermComponent } from './dialog-term/dialog-term.component';
import { Tf01docstatusPipe } from '../shared/pipes';
import { ImgviewPageComponent } from './imgview-page/imgview-page.component';
import { DialogFirstComponent } from './dialog-first/dialog-first.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { WarningDialogComponent } from './dialog/warning-dialog/warning-dialog.component';

@NgModule({
    declarations: [
        CustomerComponent,
        FooterComponent,
        HeaderComponent,
        DialogComponent,
        ConfirmationDialogComponent,
        DialogTermComponent,
        Tf01docstatusPipe,
        ImgviewPageComponent,
        DialogFirstComponent,
        WarningDialogComponent
    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatTableModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
        MatProgressBarModule,
        MatCardModule,
        MatIconModule,
        NgSelectModule,
        ToastrModule.forRoot({
            positionClass :'toast-bottom-right'
          }),
    ],
    entryComponents: [DialogComponent, ConfirmationDialogComponent, DialogTermComponent, ImgviewPageComponent, DialogFirstComponent, WarningDialogComponent]
})
export class CustomerModule {}
