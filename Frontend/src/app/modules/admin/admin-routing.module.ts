import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { TendersListComponent } from "src/app/shared/components/tenders-list/tenders-list.component";
import { SummaryComponent } from "./components/summary/summary.component";
import { ContractorsComponent } from "./components/contractors/contractors.component";
import { TenderDetailComponent } from "src/app/shared/components/tender-detail/tender-detail.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "", component: SummaryComponent },
      { path: "all", component: TendersListComponent },
      { path: "done", component: TendersListComponent },
      { path: "started", component: TendersListComponent },
      { path: "contractors", component: ContractorsComponent },
      { path: "detail/:id", component: TenderDetailComponent },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
