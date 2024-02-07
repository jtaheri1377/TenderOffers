import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { AuthService } from "./../../../../../core/services/auth.service";
import { Component, Input } from "@angular/core";
import { Contributor } from "src/app/core/models/contributor.model";
import { Tender } from "src/app/core/models/tender.model";
import { TenderService } from "src/app/shared/services/tender.service";

@Component({
  selector: "app-contributor-item",
  templateUrl: "./contributor-item.component.html",
  styleUrls: ["./contributor-item.component.scss"],
})
export class ContributorItemComponent {
  @Input() tenderItem: Tender | null = null;
  @Input() item: Contributor = {
    id: 0,
    fullname: "",
    username: "",
    suggestedPrice: "",
  };
  isAdmin: boolean = false;

  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private service: TenderService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.auth.getUserBaseUrl() === "admin" ? true : false;

  }

  choose() {
    this.tenderItem!.chosenContractor.fullname = this.item.fullname;
    this.tenderItem!.isActive = false;
    this.tenderItem!.chosenContractor.userName = this.item.username;
    this.service.chooseContributor(this.tenderItem!).subscribe((res) => {
      if (res.ok) {
        const config: MatSnackBarConfig = new MatSnackBarConfig();
        config.duration = 2000;
        this.snackbar.open(
          "انتخاب پیمانکار با موفقیت انجام شد.",
          "ممنون",
          config
        );
      }
    });
  }

  isChosen() {
    return this.item.username == this.tenderItem?.chosenContractor.userName
      ? true : false;
  }
}
