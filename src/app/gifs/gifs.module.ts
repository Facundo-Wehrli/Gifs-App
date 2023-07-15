import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CardListComponent } from './components/card-list/card-list.component';
import { GifsCardComponent } from './components/cards/card.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';

@NgModule({
  declarations: [HomePageComponent, SearchBoxComponent, CardListComponent, GifsCardComponent],
  imports: [CommonModule, SharedModule],
  exports: [HomePageComponent, SearchBoxComponent, CardListComponent],
})
export class GifsModule {}
