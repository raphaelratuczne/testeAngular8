import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { MyDirectiveDirective } from './directives/my-directive.directive';
import { MyPipePipe } from './pipes/my-pipe.pipe';
import { MyComponentComponent } from './components/my-component/my-component.component';
import { MyServiceService } from './services/my-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyDirectiveDirective,
    MyPipePipe,
    MyComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule
  ],
  providers: [MyServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
