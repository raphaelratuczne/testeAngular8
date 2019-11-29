import { Component, OnInit } from '@angular/core';

import { MyServiceService } from '../../services/my-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public texto;

  constructor(private service: MyServiceService) { }

  async ngOnInit() {
    this.texto = await this.service.teste();
  }

}
