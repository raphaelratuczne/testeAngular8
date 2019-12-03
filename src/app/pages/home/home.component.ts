import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MyServiceService } from '../../services/my-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // public texto;
  public people;
  public loading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: MyServiceService) {}

  ngOnInit() {
    this.goPage();
    console.log('people',this.people);

    this.paginator.page.subscribe(async () => {
      console.log('pageIndex',this.paginator.pageIndex);
      this.goPage(this.paginator.pageIndex);
    });
  }

  async goPage(page = 0) {
    try {
      this.loading = true;
      //this.people = [];
      this.people = await this.service.getListPeople(page+1);
    } catch(e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

}
