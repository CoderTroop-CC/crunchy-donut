import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthenticationService } from './../../auth/authentication.service';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { FilterSortService } from './../../core/filter-sort.service';
import { sharingModel } from './../../core/models/sharing.model'; 
import { Subscription } from 'rxjs/Subscription';
import { expandCollapse } from './../../core/expand-collapse.animation';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  animations: [expandCollapse]
})
export class ShareComponent implements OnInit, OnDestroy {
  @Input() noteId: string;
  sharesSub: Subscription;
  shares: sharingModel[];
  loading: boolean;
  error: boolean;
  userShare: sharingModel;
  totalAttending: number;
  footerTense: string;
  showAllShares = false;
  showSharesText = 'View All Shares';
  showEditForm: boolean;
  editBtnText: string;

  constructor(
    public auth: AuthenticationService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService) { }

  ngOnInit() {
    this.toggleEditForm(false);
    this._getShares();
  }

  private _getShares() {
    this.loading = true;
    // Get sharess by note ID
    this.sharesSub = this.api
      .getSharesByNoteId$(this.noteId)
      .subscribe(
        res => {
          this.shares = res;
          this._updateShareState();
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  toggleShowShares() {
    this.showAllShares = !this.showAllShares;
    this.showSharesText = this.showAllShares ? 'Hide Shares' : 'Show All Shares';
  }

  toggleEditForm(setVal?: boolean) {
    this.showEditForm = setVal !== undefined ? setVal : !this.showEditForm;
    this.editBtnText = this.showEditForm ? 'Cancel Edit' : 'Edit My Sharing';
  }

  onSubmitShare(e) {
    if (e.share) {
      this.userShare = e.share;
      this._updateShareState(true);
      this.toggleEditForm(false);
    }
  }

  private _updateShareState(changed?: boolean) {
    // If share matching user ID is already
    // in share array, set as initial share
    const _initialUserShare = this.shares.filter(share => {
        return share.userId === this.auth.userProfile.sub;
      })[0];
      // If user has not shared before and has made
    // a change, push new share to local shares store
    if (!_initialUserShare && this.userShare && changed) {
      this.shares.push(this.userShare);
    }
    this._setUserShareGetAttending(changed);
  }

  // update to show who it is shared with
  private _setUserShareGetAttending(changed?: boolean) {
    // Iterate over Shares to get/set user's Share
    // and get total number shared users
    let counts = 0;
    const shareArr = this.shares.map(share => {
      // If user has an existing Share
      if (share.userId === this.auth.userProfile.sub) {
        this.userShare = share;
      }
      // Count total number of users
      // + additional users
      if (share.share) {
        counts++;
      }
      return share;
    });
    this.shares = shareArr;
    this.totalAttending = counts;
  }

  ngOnDestroy() {
    this.sharesSub.unsubscribe();
  }

}
