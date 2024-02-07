import { NgModule } from "@angular/core";

import { ContractorRoutingModule } from "./contractor-routing.module";
import { ContractorComponent } from "./contractor.component";
import { TenderContributeComponent } from "./components/tender-contribute/tender-contribute.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ContractorComponent, TenderContributeComponent],
  imports: [SharedModule, ContractorRoutingModule],
})
export class ContractorModule {}
