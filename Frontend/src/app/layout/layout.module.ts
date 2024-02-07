import { NgModule } from "@angular/core";
import { SiteLayoutComponent } from "./site-layout/site-layout.component";
import { FooterComponent } from "./site-layout/footer/footer.component";
import { HeaderComponent } from "./site-layout/header/header.component";
import { MainComponent } from "./site-layout/main/main.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { SideBarItemComponent } from './site-layout/main/side-bar-item/side-bar-item.component';

@NgModule({
  declarations: [
    SiteLayoutComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    SideBarItemComponent,
  ],
  imports: [SharedModule, AppRoutingModule],
  exports: [SiteLayoutComponent],
})
export class LayoutModule {}
