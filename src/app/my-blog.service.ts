import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Post } from './models/post.model';

@Injectable({
  providedIn: 'root'
})
export class MyBlogService {

  posts: Post[];

  constructor() {
    this.posts = [
      new Post(1, 'Premier Post', 'Voici le premier post', new Date(), 7),
      new Post(2, 'Second Post', 'Voici le second postcsekcjbskjc bsdk  jcbdsjkcbkj dsbcdsjk cbdsjkbckdsjcbk', new Date(), -2),
      new Post(3, 'Article peu', 'Pffff rien etc..', new Date(), 3)
    ];
  }

  postListSubject = new Subject<Post[]>();

  addPost(title: string, content: string) {
    const postObject = {
      id: 0,
      title: '',
      content: '',
      creationDate: new Date(),
      likes: 0
    };
    postObject.title = title;
    postObject.content = content;
    postObject.id = (this.findPostMaxId() + 1);
    this.posts.push(postObject);
    this.emitPostListSubject();
  }

  findPostMaxId() {
    let maxId: number = 0;
    for (let currentPost of this.posts) {
      if (currentPost.id > maxId) {
        maxId = currentPost.id;
      }
    }
    return maxId;
  }

  getPostById(id: number) {
    const postFound = this.posts.find(
      (post) => {
        return post.id === id;
      }
    );
    return postFound;
  }

  doLoveIt(id: number) {
    const postIncreased = this.getPostById(id);
    postIncreased.likes++;
    this.emitPostListSubject();
  }

  doNotLoveIt(id: number) {
    const postDecreased = this.getPostById(id);
    postDecreased.likes--;
    this.emitPostListSubject();
  }

  delete(id: number) {
    const postIndexToRemove = this.posts.findIndex(
      (postElt) => {
        if(postElt.id === id) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.emitPostListSubject();
  }

  emitPostListSubject() {
    this.postListSubject.next(this.posts.slice());
  }

}
