import { Component, Input } from "@angular/core";
import { User } from "src/app/core/models/user.model";

@Component({
  selector: "app-contractor",
  templateUrl: "./contractor.component.html",
  styleUrls: ["./contractor.component.scss"],
})
export class ContractorComponent {
  @Input() item: User = {
    id: 0,
    fullname: "",
    username: "",
    comment: "",
    type: 0
  };
}
