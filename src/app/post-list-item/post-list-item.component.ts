import { Component, OnInit, Input } from '@angular/core';
import { MyBlogService } from '../my-blog.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  @Input() creationDate: Date;
  @Input() likes: number;
  @Input() id: number;

  constructor(private postsService: MyBlogService) { }

  ngOnInit() { }

  getColor() {
    if(this.likes > 0) {
      return 'green';
    } else if(this.likes < 0) {
      return 'red';
    } else {
      return 'black';
    }
  }

  onDoLoveIt() {
     this.postsService.doLoveIt(this.id);
  }

  onDoNotLoveIt() {
    this.postsService.doNotLoveIt(this.id);
  }

  onDelete() {
    this.postsService.delete(this.id);
  }

}
