import { Component, Inject, OnDestroy, Optional } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { Tender } from "src/app/core/models/tender.model";
import { AdminService } from "../../services/admin.service";
import { TenderService } from "src/app/shared/services/tender.service";

@Component({
  selector: "app-tender-dialog",
  templateUrl: "./tender-dialog.component.html",
  styleUrls: ["./tender-dialog.component.scss"],
})
export class TenderDialogComponent implements OnDestroy {
  tenderForm: FormGroup = new FormGroup({
    title: new FormControl("", Validators.required),
    comment: new FormControl("", Validators.required),
    minPrice: new FormControl("", Validators.required),
    maxPrice: new FormControl("", Validators.required),
    startOn: new FormControl("", Validators.required),
    finishOn: new FormControl("", Validators.required),
    contributors: new FormControl([]),
    id: new FormControl(),
  });
  subscriptions: Subscription[] = [];
  isEditMode: boolean = false;
  title: string = "تعریف مناقصه جدید:";
  tenderState: any = {};

  constructor(
    private snackbar: MatSnackBar,
    private tenderService: TenderService,
    private admin: AdminService,
    @Optional() public dialogRef: MatDialogRef<TenderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.isEditMode = data.isEditMode;
    if (this.isEditMode) {
      this.title = "ویرایش اطلاعات مناقصه:";
      this.tenderForm.patchValue({
        id: data.id,
        comment: data.comment,
        title: data.title,
        startOn: data.startOn,
        finishOn: data.finishOn,
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
      });
      this.tenderState = {
        contributors: data.contributors,
        chosenContractor: data.chosenContractor,
        isActive: data.isActive,
      };
    }
  }

  save() {
    let tender: Tender = {
      comment: this.tenderForm.value.comment,
      title: this.tenderForm.value.title,
      startOn: this.tenderForm.value.startOn,
      finishOn: this.tenderForm.value.finishOn,
      minPrice: this.tenderForm.value.minPrice,
      maxPrice: this.tenderForm.value.maxPrice,
      contributors: [],
      chosenContractor: {},
      isActive: true,
    };

    if (this.isEditMode) {
      tender.chosenContractor = this.tenderState.chosenContractor;
      tender.contributors = this.tenderState.contributors;
      tender.isActive = this.tenderState.isActive;
      tender.id = this.tenderForm.value.id;
    }

    const subscription = this.admin.saveTender(tender).subscribe((res: any) => {
      console.log(res);
      if (res.ok) {
        this.dialogRef.close();
        const config: MatSnackBarConfig<any> = {
          duration: 2000,
        };
        this.tenderService.tendersUpdated$.next();
        const message = this.isEditMode
          ? "تغییرات با موفقیت ثبت شد."
          : "مناقصه با موفقیت افزوده شد.";
        this.snackbar.open(message, "بستن", config);
      }
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
