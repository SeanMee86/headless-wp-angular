import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sendPageContent = new EventEmitter<{
    title: string,
    body: string,
    image: string
  }>();
  projects = [];
  pageContent: string;
  pageTitle: string;
  pageImage: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost/wp-json/myroutes/menu').subscribe((data) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.projects.push((data[key]));
        }
      }
    });
  }

  onNavClick(id) {
    this.http.get(`http://localhost/wp-json/wp/v2/pages/${id}`).subscribe((data) => {
      this.pageContent = data.content.rendered;
      this.pageTitle = data.title.rendered;
      this.pageImage = data.better_featured_image;
      this.sendPageContent.emit({
        title: this.pageTitle,
        body: this.pageContent,
        image: this.pageImage
      });
    });
  }
}
