import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { SearchAnimeComponent } from './components/search-anime/search-anime.component';
import { DetailsSearchComponent } from './components/details-search/details-search.component';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    SearchAnimeComponent,
    DetailsSearchComponent
  ]
})
export class HomePageModule {}
