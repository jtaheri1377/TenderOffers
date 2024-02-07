import { Component, Input } from "@angular/core";

@Component({
  selector: "app-side-bar-item",
  templateUrl: "./side-bar-item.component.html",
  styleUrls: ["./side-bar-item.component.scss"],
})
export class SideBarItemComponent {
  @Input() title= "";
}
