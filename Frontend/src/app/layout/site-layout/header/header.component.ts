import { MatDialogConfig } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "./../../../shared/components/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { DrawerService } from "./../services/drawer.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { take } from "rxjs/Operators";
import { AuthService } from "src/app/core/services/auth.service";
import { User } from "src/app/core/models/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  _destroyed$: Subject<void> = new Subject();
  isAuthorized: boolean = false;
  userTitle: string = "";
  user: User | null = { fullname: "", username: "", type: 0, id: 0 };

  constructor(
    private drawer: DrawerService,
    private auth: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.user = this.auth.getCurrentUser();
    this.auth.userUpdated$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((newUser) => {
        if (!newUser) this.isAuthorized = false;
        else {
          this.user = newUser;
          this.isAuthorized = this.user ? true : false;
          this.setUserTitle();
        }
      });
    this.isAuthorized = this.user ? true : false;
    this.setUserTitle();
  }

  setUserTitle() {
    if (!this.isAuthorized) return;
    switch (this.user!.type) {
      case 0:
        this.userTitle = "مدیر";
        break;
      case 1:
        this.userTitle = "پیمانکار";
        break;
    }
  }

  logout() {
    const config: MatDialogConfig = {
      data: {
        message: "آیا می خواهید از حساب کاربری خود خارج شوید",
      },
    };
    const dialog = this.dialog.open(ConfirmDialogComponent, config);
    dialog
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) {
          this.auth.logout();
          this.getCurrentUser();
        }
      });
  }

  toggleDrawer() {
    this.drawer.toggleDrawer.next(false);
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }
}
