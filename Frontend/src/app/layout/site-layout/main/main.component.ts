import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { DrawerService } from "./../services/drawer.service";
import { Component, ViewChild, OnInit } from "@angular/core";
import { AuthService } from "src/app/core/services/auth.service";
import { TenderDialogComponent } from "src/app/modules/admin/components/tender-dialog/tender-dialog.component";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  isAuthorized: boolean = false;
  isAdmin: boolean = false;
  routeBaseUrl: string = "";

  @ViewChild("sidenav") drawer: any;

  constructor(
    private drawerService: DrawerService,
    private dialog: MatDialog,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.drawerService.toggleDrawer.subscribe(() => this.drawer.toggle());
    this.routeBaseUrl = this.auth.getUserBaseUrl();

    this.auth.userUpdated$.subscribe(() => {
      this.routeBaseUrl = this.auth.getUserBaseUrl();
    });
  }

  tendersList = [
    {
      title: "کل مناقصات",
      route: "all",
    },
    {
      title: "مناقصات انجام شده",
      route: "done",
    },
    {
      title: "مناقصات شروع شده",
      route: "started",
    },
  ];

  adminBtns = [
    {
      title: "پیمانکاران",
      route: "contractors",
    },
    {
      title: "داشبورد",
      route: "",
    },
  ];

  closeSidebar() {
    this.drawerService.toggleDrawer.next(false);
  }
  openTenderDialog() {
    const config: MatDialogConfig = {
      data: {
        isEditMode: false,
      },
      disableClose: true,
      height: "fit-content",
    };
    this.dialog.open(TenderDialogComponent, config);
  }
}
