import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "./core/guardes/auth.guard";
import { contractorGuard } from "./core/guardes/contractor.guard";
import { adminGuard } from "./core/guardes/admin.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  {
    path: "admin",
    canActivate: [adminGuard],
    loadChildren: () =>
      import("./modules/admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "contractor",
    canActivate: [contractorGuard],
    loadChildren: () =>
      import("./modules/contractor/contractor.module").then(
        (m) => m.ContractorModule
      ),
  },
  {
    path: "auth",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./modules/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "**",
    canActivate: [authGuard],
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
