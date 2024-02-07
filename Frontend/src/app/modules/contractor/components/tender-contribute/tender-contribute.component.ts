import { Component, Inject, Optional } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { User } from "src/app/core/models/user.model";
import { Tender } from "src/app/core/models/tender.model";
import { ContractorService } from "../../services/contractor.service";
import { Contributor } from "src/app/core/models/contributor.model";

@Component({
  selector: "app-tender-contribute",
  templateUrl: "./tender-contribute.component.html",
  styleUrls: ["./tender-contribute.component.scss"],
})
export class TenderContributeComponent {
  contributeForm: FormGroup = new FormGroup({
    price: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),
  });
  subscriptions: Subscription[] = [];
  isEditMode: boolean = false;
  tenderItem: Tender;

  constructor(
    private snackbar: MatSnackBar,
    private service: ContractorService,
    private auth: AuthService,
    @Optional() public dialogRef: MatDialogRef<TenderContributeComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.tenderItem = data.tender;
  }

  save() {
    let user: User | null = this.auth.getCurrentUser();
    if (user) {
      let result: any = this.tenderItem;
      let contribute: Contributor = {
        username: user.username,
        fullname: user.fullname,
        suggestedPrice: this.contributeForm.value.price,
      };
      if (result.contributors.length === 0) {
        delete result.contributors;
        result = { ...result, contributors: [{ ...contribute }] };
      } else {
        (result as Tender).contributors.push(contribute);
      }
      this.service.contributeOnTender(result).subscribe((result) => {
        if (result.ok) {
          const config: MatSnackBarConfig = new MatSnackBarConfig();
          config.duration = 2000;
          this.snackbar.open("پیشنهاد شما با موفقیت ثبت شد", "ممنون", config);
          this.dialogRef.close();
        }
      });
    }
  }
}
