import { ContributorItemComponent } from './components/tender-detail/contributors-list/contributor-item/contributor-item.component';
import { ContributorsListComponent } from './components/tender-detail/contributors-list/contributors-list.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSidenavModule } from "@angular/material/sidenav";
import { NgPipesModule } from "ngx-pipes";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule } from "@angular/material/divider";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { TendersListComponent } from "./components/tenders-list/tenders-list.component";
import { TenderItemComponent } from "./components/tenders-list/tender-item/tender-item.component";
import { AlertComponent } from "./components/alert/alert.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { EmptyComponent } from "./components/empty/empty.component";
import { HttpClientModule } from "@angular/common/http";
import { LoaderComponent } from "./components/loader/loader.component";
import { MinOfObjectsPipe } from "./pipes/min-of-objects.pipe";
import { TenderDetailComponent } from './components/tender-detail/tender-detail.component';

const matsModule = [
  MatButtonModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatRippleModule,
  MatSidenavModule,
  MatMenuModule,
  MatTooltipModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
];

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    TendersListComponent,
    TenderItemComponent,
    AlertComponent,
    EmptyComponent,
    ContributorsListComponent,
    ContributorItemComponent,
    TenderDetailComponent,
    LoaderComponent,
    MinOfObjectsPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    matsModule,
    RouterModule,
    ReactiveFormsModule,
    NgPipesModule,
  ],
  exports: [
    matsModule,
    CommonModule,
    ReactiveFormsModule,
    EmptyComponent,
  ],
  providers: [MatDatepickerModule],
})
export class SharedModule {}
