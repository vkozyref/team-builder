import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootComponent } from './root/root.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardComponent } from './root/card/card.component';
import { HeaderComponent } from './root/header/header.component';
import { MenuComponent } from './root/menu/menu.component';
import { CardCanvasComponent } from './root/card-canvas/card-canvas.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    RootComponent,
    CardComponent,
    HeaderComponent,
    MenuComponent,
    CardCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
