import { environment } from '../../../../environments/environment';
import { MainService } from '../../../services/main.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-photos-list',
  imports: [],
  templateUrl: './photos-list.component.html',
  styleUrl: './photos-list.component.scss'
})
export class PhotosListComponent implements OnInit {

  private mainService = inject(MainService);


  ngOnInit() {
    console.log(environment.apiKey)
    this.mainService.getAllPhtos().subscribe((data) => {
      console.log('data', data)
    })
  }
}
