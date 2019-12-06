import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MyServiceService } from '../../services/my-service.service';
import { logging } from 'selenium-webdriver';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  public people;
  public total = 0;
  public loadingList = true;
  public loadingHomeworld = false;
  public loadingStarships = false;

  public homeworld: Map<number,string> = new Map();
  public starships = {};
  public displayedColumns: string[] = ['name', 'model', 'starship_class'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: MyServiceService) { }

  async ngOnInit() {
    await this.goPage();

    this.paginator.page.subscribe(async () => {
      this.goPage(this.paginator.pageIndex);
    });
  }

  async goPage(page = 0) {
    try {
      this.loadingList = true;
      this.people = await this.service.getListPeople(page+1);
      this.total = this.people.count;
    } catch(e) {
      console.log(e);
    } finally {
      this.loadingList = false;
    }
  }

  getId(prop) {
    const arr = prop.split('/');
    return Number(arr[ arr.length - 2 ]);
  }

  expanded(person) {
    this.getHomeworld(person);
    this.getStarships(person);
  }

  async getHomeworld(person) {
    const homeworldId = this.getId(person.homeworld);
    if (!this.homeworld.get(homeworldId)) {
      try {
        this.loadingHomeworld = true;
        const homeworld = await this.service.getData(person.homeworld);
        this.homeworld.set(homeworldId, homeworld.name);
      } catch(e) {
        console.log(e);
      } finally {
        this.loadingHomeworld = false;
      }
    }
  }

  async getStarships(person) {
    const personId = this.getId(person.url);
    if (person.starships.length && !this.starships[personId]) {
      try {
        this.loadingStarships = true;
        this.starships[personId] = [];
        for (const url of person.starships) {
          const {name, model, starship_class} = await this.service.getData(url);
          this.starships[personId].push({name, model, starship_class});
        }
      } catch(e) {
        console.log(e);
      } finally {
        this.loadingStarships = false;
      }
    }
  }
}
