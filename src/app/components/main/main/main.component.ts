import { environment } from '../../../../environments/environment';
import { MainService } from './../../../services/main.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  private mainService = inject(MainService);


  ngOnInit() {
    console.log(environment.apiKey)
    this.mainService.getAllPhtos().subscribe((data) => {
      console.log('data', data)
    })
  }
}
