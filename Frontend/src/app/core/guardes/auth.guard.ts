import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserType } from "../Enums/user";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem("user")!);
  if (user) {
    if (user.type === UserType.admin) router.navigate(["admin"]);
    else if (user.type === UserType.contractor) router.navigate(["contractor"]);
    return false;
  } else return true;
};
