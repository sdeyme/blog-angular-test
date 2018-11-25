import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyBlogService } from '../my-blog.service';
import { Subscription } from 'rxjs';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(private postsService: MyBlogService) { }

  postList: Post[];
  ListSubscription: Subscription;

  ngOnInit() {
    this.ListSubscription = this.postsService.postListSubject.subscribe(
      (posts: Post[]) => {
        this.postList = posts;
      }
    );
    this.postsService.emitPostListSubject();
  }

  ngOnDestroy() {
    this.ListSubscription.unsubscribe();
  }

}
