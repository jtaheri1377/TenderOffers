import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserType } from "../Enums/user";

export const contractorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem("user")!);
  if (user) {
    if (user.type === UserType.contractor) {
      return true;
    } else if (user.type === UserType.admin) router.navigate(["admin"]);
  } else router.navigate(["/auth"]);
  return false;
};
