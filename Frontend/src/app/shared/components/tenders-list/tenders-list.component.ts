import { Component, OnDestroy, OnInit } from "@angular/core";
import { Tender } from "src/app/core/models/tender.model";
import { TenderService } from "../../services/tender.service";
import { Subscription } from "rxjs";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-tenders-list",
  templateUrl: "./tenders-list.component.html",
  styleUrls: ["./tenders-list.component.scss"],
})
export class TendersListComponent implements OnInit, OnDestroy {
  pageTitle = "تمام مناقصات";
  tenders: Tender[] | null = [];
  subscriptions: Subscription[] = [];
  isLoading: boolean = false;
  route = "";

  constructor(private tender: TenderService, private router: Router) {}

  ngOnInit(): void {
    this.RoutingGetList();
    const subscription = this.tender.tendersUpdated$.subscribe(() =>
      this.getList()
    );
    this.subscriptions.push(subscription);
  }

  RoutingGetList() {
    const subscription = this.router.events.subscribe((event: any) => {
      if (event["routerEvent"] instanceof NavigationEnd) {
        this.route = event["routerEvent"].url.split("/")![2];
        this.getList();
      }
    });
    this.subscriptions.push(subscription);
  }

  getList() {
    this.isLoading = true;
    const subscription = this.tender.getAll().subscribe((res: any) => {
      if (res.ok) {
        switch (this.route) {
          case "done": {
            this.pageTitle = "مناقصات انجام شده";
            this.tenders = res.body.filter(
              (tender: any) => tender.isActive === false
            );
            break;
          }
          case "started": {
            this.pageTitle = "مناقصات آغاز شده";
            this.tenders = res.body.filter(
              (tender: any) => tender.isActive === true
            );
            break;
          }
          default:
            this.tenders = res.body;
            break;
        }
        this.isLoading = false;
      }
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
