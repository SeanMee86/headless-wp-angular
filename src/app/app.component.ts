import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projects = [];
  htmlBody: string;
  title: string;
  image: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost/wp-json/wp/v2/pages').subscribe((data) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key].link === 'http://localhost/') {
            this.htmlBody = data[key].content.rendered;
            this.title = data[key].title.rendered;
            this.image = data[key].better_featured_image;
          }
          this.projects.push((data[key]));
        }
      }
    });
  }

  getPageContent(e) {
    this.htmlBody = e.body;
    this.title = e.title;
    this.image = e.image;
  }
}
