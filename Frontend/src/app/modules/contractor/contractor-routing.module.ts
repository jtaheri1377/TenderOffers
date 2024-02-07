import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContractorComponent } from "./contractor.component";
import { TendersListComponent } from "src/app/shared/components/tenders-list/tenders-list.component";
import { TenderDetailComponent } from "src/app/shared/components/tender-detail/tender-detail.component";

const routes: Routes = [
  {
    path: "",
    component: ContractorComponent,
    children: [
      { path: "", component: TendersListComponent },
      { path: "all", component: TendersListComponent },
      { path: "done", component: TendersListComponent },
      { path: "started", component: TendersListComponent },
      { path: "detail/:id", component: TenderDetailComponent },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractorRoutingModule {}
