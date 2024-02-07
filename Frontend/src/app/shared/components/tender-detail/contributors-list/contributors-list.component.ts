import { Component, Input } from "@angular/core";
import { Contributor } from "src/app/core/models/contributor.model";
import { Tender } from "src/app/core/models/tender.model";

@Component({
  selector: "app-contributors-list",
  templateUrl: "./contributors-list.component.html",
  styleUrls: ["./contributors-list.component.scss"],
})
export class ContributorsListComponent {
  @Input() tenderItem: Tender | null = null;
  @Input() items: Contributor[] = [];

}
