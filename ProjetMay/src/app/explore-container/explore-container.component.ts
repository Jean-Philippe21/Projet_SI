import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {

    constructor(private menu: MenuController) { }

    ngOnInit(): void {
    }

    openFirst() {
        this.menu.open('main-menu');
    }

}
