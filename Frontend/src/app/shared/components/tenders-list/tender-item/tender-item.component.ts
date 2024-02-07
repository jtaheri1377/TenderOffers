import { Subscription } from 'rxjs';
import { AuthService } from "./../../../../core/services/auth.service";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { Tender } from "src/app/core/models/tender.model";
import { TenderDialogComponent } from "src/app/modules/admin/components/tender-dialog/tender-dialog.component";
import { TenderContributeComponent } from "src/app/modules/contractor/components/tender-contribute/tender-contribute.component";
import { ConfirmDialogComponent } from "../../confirm-dialog/confirm-dialog.component";
import { TenderService } from "src/app/shared/services/tender.service";
import { switchMap, take } from "rxjs/Operators";
import { User } from "src/app/core/models/user.model";

@Component({
  selector: "app-tender-item",
  templateUrl: "./tender-item.component.html",
  styleUrls: ["./tender-item.component.scss"],
})

export class TenderItemComponent implements OnInit, OnDestroy {
  @Input() item: Tender = {
    id: 0,
    comment: "",
    title: "",
    startOn: new Date().toLocaleString().toString(),
    finishOn: new Date().toLocaleString().toString(),
    minPrice: 20000,
    maxPrice: 216000,
    contributors: [],
    chosenContractor: {
      fullname: "جواد عزتی",
      userName: "@Javad_Ezzati",
    },
    isActive: false,
  };
  routeBaseUrl: string = "";
  user: User | null = null;
  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private auth: AuthService,
    private tender: TenderService
  ) { }

  ngOnInit(): void {
    const lastUser = this.auth.getLastUser();
    if (lastUser) {
      this.user = lastUser;
    }
    this.routeBaseUrl = this.auth.getUserBaseUrl();
    // const subs = this.auth.user$.subscribe((user: User | null) => {
    //   this.routeBaseUrl = this.auth.getUserBaseUrl();
    //   this.user = user;
    //   this.isContributed();
    // });

    // this.subscriptions.push(subs);
  }

  isContributed(): boolean {

    if (this.user)
    var result = this.item.contributors.find(x => x.username == this.user?.username);
    return result ? true : false;
  }


  openContributeDialog() {
    const config: MatDialogConfig = {
      data: {
        tender: this.item,
      },
      disableClose: true,
      height: "fit-content",
      closeOnNavigation: false,
    };
    this.dialog.open(TenderContributeComponent, config);
  }

  openTenderDialog() {
    const config: MatDialogConfig = {
      data: {
        isEditMode: true,
        id: this.item.id,
        comment: this.item.comment,
        title: this.item.title,
        startOn: this.item.startOn,
        finishOn: this.item.finishOn,
        minPrice: this.item.minPrice,
        maxPrice: this.item.maxPrice,
        contributors: this.item.contributors,
        chosenContractor: this.item.chosenContractor,
        isActive: this.item.isActive,
      },
      disableClose: true,
      closeOnNavigation: false,
    };
    this.dialog.open(TenderDialogComponent, config);
  }

  delete() {
    const config: MatDialogConfig = {
      data: {
        message: "آیا می خواهید این مناقصه حذف گردد",
      },
    };
    const dialog = this.dialog.open(ConfirmDialogComponent, config);
    dialog
      .afterClosed()
      .pipe(
        take(1),
        switchMap((res) => {
          if (res && this.item.id) {
            return this.tender.delete(this.item.id?.toString());
          }
          return this.tender.getAll();
        })
      )
      .subscribe((res) => {
        if (res.ok) {
          const config: MatSnackBarConfig<any> = {
            duration: 2000,
          };
          this.tender.tendersUpdated$.next();
          this.snackbar.open(
            "مناقصه مورد نظر با موفقیت حذف شد",
            "بستن",
            config
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
