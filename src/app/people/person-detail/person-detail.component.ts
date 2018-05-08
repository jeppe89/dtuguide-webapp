import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { PersonService } from './../shared/person.service';
import { Observable } from 'rxjs/Observable';
import { SearchData } from '../../utils/search-data.interface';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  searchData$: Observable<SearchData>;

  constructor(
    private service: PersonService,
    private route: ActivatedRoute,
    private loc: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.searchData$ = this.service.getPerson(id);
  }

  goBack() {
    this.loc.back();
  }

}
