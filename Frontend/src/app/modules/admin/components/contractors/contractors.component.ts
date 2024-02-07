import { Subscription } from 'rxjs';
import { User } from "src/app/core/models/user.model";
import { UserService } from "../../../../shared/services/user.service";
import { Component, OnDestroy, OnInit } from "@angular/core";

@Component({
  selector: "app-contractors",
  templateUrl: "./contractors.component.html",
  styleUrls: ["./contractors.component.scss"],
})
export class ContractorsComponent implements OnInit, OnDestroy {

  constructor(private user: UserService) { }
  subs: Subscription[] = [];
  contractors: User[] = [];

  ngOnInit(): void {
    const sub = this.user.getContractors()
      .subscribe(res => { if (res.body) this.contractors = res.body });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((item) => item.unsubscribe());
  }
}
