import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { SummaryComponent } from "./components/summary/summary.component";
import { SummaryItemComponent } from "./components/summary/summary-item/summary-item.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ContractorsComponent } from "./components/contractors/contractors.component";
import { ContractorComponent } from "./components/contractors/contractor/contractor.component";
import { TenderDialogComponent } from "./components/tender-dialog/tender-dialog.component";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AdminComponent,
    SummaryComponent,
    SummaryItemComponent,
    ContractorsComponent,
    ContractorComponent,
    TenderDialogComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
})
export class AdminModule {}
