import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { expandCollapse } from './../../../core/expand-collapse.animation';
import { AuthenticationService } from './../../../auth/authentication.service';
import { ApiService } from './../../../core/api.service';
import { UtilsService } from './../../../core/utils.service';
import { FilterSortService } from './../../../core/filter-sort.service';
import { CommentModel } from './../../../core/models/comment.model';
import { Subscription } from 'rxjs/Subscription';
import { CommentsFormService } from './comments-form/comments-form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  animations: [expandCollapse],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() noteId: string;
  @Input() eventPast: boolean;
  commentsSub: Subscription;
  routeSub: Subscription;
  comments: CommentModel[];
  loading: boolean;
  error: boolean;
  userComment: CommentModel;
  totalComments: number;
  showEditForm: boolean;
  editBtnText: string;
  showAllComments = false;
  showCommentsText = 'View All Comments';
  showForm = false;
  showFormText = 'Show Comment Form';

  constructor(
    public auth: AuthenticationService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService) { }

  ngOnInit() {
    this._getComments();
    this.toggleEditForm(false);
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

  toggleEditForm(setVal?: boolean) {
    this.showEditForm = setVal !== undefined ? setVal : !this.showEditForm;
    this.editBtnText = this.showEditForm ? 'Cancel Edit' : 'Edit My Comment';
  }


  toggleShowForm() {
    this.showForm = !this.showForm;
    this.showFormText = this.showForm ? 'Hide Comment Form' : 'Show Comment Form';
  }

  onSubmitComment(n) {
    if (n.comment) {
      this.userComment = n.comment;
      this._updateCommentState(true);
      this.toggleEditForm(false);
    }
  }

  private _updateCommentState(changed?: boolean) {
    // If Comment matching user ID is already
    // in Comment array, set as initial comment
    const _initialUserComment = this.comments.filter(comment => {
        return comment.userEmail === this.auth.userProfile.sub;
      })[0];

    // If user has not commented before and has made
    // a change, push new comment to local comments store
    if (!_initialUserComment && this.userComment && changed) {
      this.comments.push(this.userComment);
    }
  }


  ngOnDestroy() {
    this.commentsSub.unsubscribe();
  }

}