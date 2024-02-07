import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/Operators";
import { Tender } from "src/app/core/models/tender.model";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TenderContributeComponent } from "src/app/modules/contractor/components/tender-contribute/tender-contribute.component";
import { AuthService } from "src/app/core/services/auth.service";
import { UserType } from "src/app/core/Enums/user";
import { TenderService } from "src/app/shared/services/tender.service";
import { User } from "src/app/core/models/user.model";

@Component({
  selector: "app-tender-detail",
  templateUrl: "./tender-detail.component.html",
  styleUrls: ["./tender-detail.component.scss"],
})
export class TenderDetailComponent implements OnInit, OnDestroy {
  item: Tender = {
    id: 2,
    comment:
      "در مسیر توسعه ی سازه های مسکن ملی، می خواهیم تا سال آینده 170 ساختمان ده طبقه هر واحد شامل 40 مسکن توسعه دهیم ودر این راستا نیاز به پیمانکاران باتجربه هستیم.",
    title: "ساختمان های مسکن ملی",
    startOn: new Date().toLocaleString().toString(),
    finishOn: new Date().toLocaleString().toString(),
    minPrice: 1000,
    maxPrice: 6000,
    chosenContractor: {
      fullname: "حسن رحمانی",
      userName: "hassan",
    },
    isActive: true,
    contributors: [],
  };
  subscriptions: Subscription[] = [];
  isLoading: boolean = false;
  user: User | null = null;

  constructor(
    private tenderService: TenderService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    const sub2 = this.route.params
      .pipe(
        switchMap((param) => {
          return this.tenderService.get(param["id"]);
        })
      )
      .subscribe((res: any) => {
        if (res.ok) {
          this.item = res.body;
          this.isLoading = false;
        }
      });

    const lastUser = this.auth.getLastUser();
    if (lastUser) {
      this.user = lastUser;
    }
    const sub1 = this.auth.user$.subscribe((user: User | null) => {
      this.user = user;
    });

    this.subscriptions.push(sub1);
    this.subscriptions.push(sub2);
  }

  IsUserContractor() {
    return this.auth.getCurrentUser()?.type == UserType.admin ? false : true;
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
