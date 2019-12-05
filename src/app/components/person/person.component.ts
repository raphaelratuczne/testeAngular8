import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MyServiceService } from '../../services/my-service.service';

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

  public homeworld: Map<number,string> = new Map();
  public starships = {};
  public displayedColumns: string[] = ['id', 'url'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private service: MyServiceService) { }

  async ngOnInit() {
    await this.goPage();
    console.log('people',this.people);

    this.paginator.page.subscribe(async () => {
      this.goPage(this.paginator.pageIndex);
    });
  }

  async goPage(page = 0) {
    try {
      this.loadingList = true;
      //this.people = [];
      this.people = await this.service.getListPeople(page+1);
      this.total = this.people.count;
      this.starships = {};
      for(const person of this.people.results) {
        this.starships[ this.getId(person.url) ] = person.starships.map(s => ({ id: this.getId(s), url: s }));
      }
    } catch(e) {
      console.log(e);
    } finally {
      this.loadingList = false;
    }
  }

  async expanded(person) {
    const id = this.getId(person.homeworld);
    if (!this.homeworld.get(id)) {
      try {
        this.loadingHomeworld = true;
        const homeworld = await this.service.getData(person.homeworld);
        this.homeworld.set(id, homeworld.name);
      } catch(e) {
        console.log(e);
      } finally {
        this.loadingHomeworld = false;
      }
    }
  }

  getId(prop) {
    const arr = prop.split('/');
    return Number(arr[ arr.length - 2 ]);
  }

}

/*
{
			"name": "Luke Skywalker",
			"height": "172",
			"mass": "77",
			"hair_color": "blond",
			"skin_color": "fair",
			"eye_color": "blue",
			"birth_year": "19BBY",
			"gender": "male",
			"homeworld": "https://swapi.co/api/planets/1/",
			"films": [
				"https://swapi.co/api/films/2/",
				"https://swapi.co/api/films/6/",
				"https://swapi.co/api/films/3/",
				"https://swapi.co/api/films/1/",
				"https://swapi.co/api/films/7/"
			],
			"species": [
				"https://swapi.co/api/species/1/"
			],
			"vehicles": [
				"https://swapi.co/api/vehicles/14/",
				"https://swapi.co/api/vehicles/30/"
			],
			"starships": [
				"https://swapi.co/api/starships/12/",
				"https://swapi.co/api/starships/22/"
			],
			"created": "2014-12-09T13:50:51.644000Z",
			"edited": "2014-12-20T21:17:56.891000Z",
			"url": "https://swapi.co/api/people/1/"
    },
*/
