import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() projectList: string[];
  @Output() sendPageContent = new EventEmitter<{
    title: string,
    body: string,
    image: string
  }>();
  pageContent: string;
  pageTitle: string;
  pageImage: string;
  constructor(private http: HttpClient) { }

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
