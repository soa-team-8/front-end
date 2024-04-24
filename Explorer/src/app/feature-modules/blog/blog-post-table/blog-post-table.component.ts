import { Component, OnInit } from '@angular/core';
import { BlogPost, BlogPostStatus } from '../model/blog-post.model';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ImageService } from 'src/app/shared/image/image.service';
import { Rating } from '../model/blog-rating.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UserSocialProfileService } from '../../user-social-profile/user-social-profile.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { SocialProfile } from '../../user-social-profile/model/social-profile.model';

@Component({
  selector: 'xp-blog-post-table',
  templateUrl: './blog-post-table.component.html',
  styleUrls: ['./blog-post-table.component.css']
})
export class BlogPostTableComponent implements OnInit {
  user: User | undefined;
  socialProfile: SocialProfile;
  blogPosts: BlogPost[] = [];
  selectedStatus?: BlogPostStatus;
  pageSize = 5;
  pageIndex = 1;
  totalBlogPosts = 0;

  constructor(private service: BlogService, private router: Router, private imageService: ImageService, private spservice: UserSocialProfileService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  loadBlogPosts(): void {
    this.service.getBlogPosts(this.pageIndex, this.pageSize, this.selectedStatus).subscribe((result) => {
      this.blogPosts = result.results;
      this.totalBlogPosts = result.totalCount;

      this.authService.user$.subscribe(user => {
        this.user = user;
        this.spservice.getSocilaProfile(this.user.id).subscribe((resultt) => {
          this.socialProfile = resultt;
          console.log(this.socialProfile);
          if(this.socialProfile.followed === null){
              this.blogPosts = [];
              this.totalBlogPosts = 0;
          }
          else {
            this.blogPosts = this.blogPosts.filter(post =>
              this.socialProfile.followed.some(account => account.id === post.userId)
            );
            this.totalBlogPosts = this.blogPosts.length;
          }

        });
      });
    });
  }

  onRowSelected(selectedBlogPost: BlogPost): void {
    this.router.navigate(['/blogs', selectedBlogPost.id]);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.loadBlogPosts();
  }

  onPageSizeChange(event: any): void {
    this.pageSize = event.value;
    this.pageIndex = 1;
    this.loadBlogPosts();
  }
  getImageUrl(imageName: string): string {
    return this.imageService.getImageUrl(imageName);
  }
  getUpvoteCount(blog: BlogPost): number {
    return blog.ratings ? blog.ratings.filter(rating => rating.rating === Rating.Upvote).length : 0;
  }

  getDownvoteCount(blog: BlogPost): number {
      return blog.ratings ? blog.ratings.filter(rating => rating.rating === Rating.Downvote).length : 0;
  }
  get thumbsUpEmoji(): string {
    return '\u{1F44D}';
  }

  get thumbsDownEmoji(): string {
    return '\u{1F44E}';
  }
}