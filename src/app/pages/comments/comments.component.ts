import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthenticationService } from './../../auth/authentication.service';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { FilterSortService } from './../../core/filter-sort.service';
import { CommentModel } from './../../core/models/comment.model'; 
import { Subscription } from 'rxjs/Subscription';
import { expandCollapse } from './../../core/expand-collapse.animation';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [expandCollapse]
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() noteId: string;
  commentsSub: Subscription;
  comments: CommentModel[];
  loading: boolean;
  error: boolean;
  userComment: CommentModel;
  totalAttending: number;
  footerTense: string;
  showAllComments = false;
  showCommentsText = 'View All Comments';
  showEditForm: boolean;
  editBtnText: string;

  constructor( public auth: AuthenticationService, private api: ApiService, public utils: UtilsService, public fs: FilterSortService) { }

  ngOnInit() {
    this.toggleEditForm(false);
    this._getComments();
  }

  private _getComments() {
    this.loading = true;
    // Get Comments by note ID
    this.commentsSub = this.api
      .getCommentsByNoteId$(this.noteId)
      .subscribe(
        res => {
          this.comments = res;
          this._updateCommentState();
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  toggleShowComments() {
    this.showAllComments = !this.showAllComments;
    this.showCommentsText = this.showAllComments ? 'Hide Comments' : 'Show All Comments';
  }

  toggleEditForm(setVal?: boolean) {
    this.showEditForm = setVal !== undefined ? setVal : !this.showEditForm;
    this.editBtnText = this.showEditForm ? 'Cancel Edit' : 'Edit My Comment';
  }

  onSubmitComment(e) {
    if (e.comment) {
      this.userComment = e.comment;
      this._updateCommentState(true);
      this.toggleEditForm(false);
    }
  }

  private _updateCommentState(changed?: boolean) {
    // If Comment matching user ID is already
    // in Comment array, set as initial Comment
    const _initialUserComment = this.comments.filter(comment => {
        return comment.userId === this.auth.userProfile.sub;
      })[0];
      // If user has not commentd before and has made
    // a change, push new comment to local comments store
    if (!_initialUserComment && this.userComment && changed) {
      this.comments.push(this.userComment);
    }
    this._setUserCommentGetAttending(changed);
  }

  // update to show who it is Commentd with
  private _setUserCommentGetAttending(changed?: boolean) {
    // Iterate over Comments to get/set user's Comment
    // and get total number Commentd users
    let counts = 0;
    const commentArr = this.comments.map(comment => {
      // If user has an existing comment
      if (comment.userId === this.auth.userProfile.sub) {
        this.userComment = comment;
      }
      // Count total number of users
      // + additional users
      if (comment.comment) {
        counts++;
      }
      return comment;
    });
    this.comments = commentArr;
    this.totalAttending = counts;
  }

  ngOnDestroy() {
    this.commentsSub.unsubscribe();
  }

}

