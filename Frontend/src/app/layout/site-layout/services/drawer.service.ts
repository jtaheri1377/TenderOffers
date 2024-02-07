import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  toggleDrawer: Subject<boolean> = new Subject<boolean>();

  constructor() { }
}
