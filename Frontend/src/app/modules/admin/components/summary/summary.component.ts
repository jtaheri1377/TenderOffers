import { Observable, Subscription, forkJoin } from 'rxjs';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TenderDialogComponent } from "../tender-dialog/tender-dialog.component";
import { TenderService } from "src/app/shared/services/tender.service";
import { Tender } from "src/app/core/models/tender.model";
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.scss"],
})
export class SummaryComponent implements OnInit, OnDestroy {
  tenders: Tender[] | null = null;
  subs: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private tender: TenderService,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.fetchTenders();
  }


  async fetchTenders() {
    const response = await this.tender.getAll().toPromise();
    if (response.body) {
      this.summaries[0].amount = response.body.length;
      this.summaries[1].amount =
        response.body.filter(x => !x.isActive).length;
      this.summaries[2].amount =
        response.body.filter(x => x.isActive).length;
    }
    const contractors = await this.user.getContractors().toPromise();
    if (contractors.body) {
      this.summaries[3].amount = contractors.body.length;
    }

  }

  summaries = [
    {
      color: "#50c127",
      title: "کل مناقصات",
      route: "all",
      amount: 0,
    },
    {
      color: "orange",
      title: "مناقصات انجام شده",
      route: "done",
      amount: 0,
    },
    {
      color: "#ff45bb",
      title: "مناقصات آغاز شده",
      route: "started",
      amount: 0,
    },
    {
      color: "#6989fc",
      title: "پیمانکاران",
      route: "contractors",
      amount: 0,
    },
  ];

  openTenderDialog() {
    const config: MatDialogConfig = {
      data: {
        isEditMode: false,
      },
      disableClose: true,
      closeOnNavigation: false,
    };
    this.dialog.open(TenderDialogComponent, config);
  }

  ngOnDestroy(): void {
    this.subs.forEach((item) => item.unsubscribe());
  }
}
