import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';



export class GhostComponentService {
  private _isLoading = new BehaviorSubject<Object>(false)
  public isLoading = this._isLoading.asObservable()

  public setLoading(isLoading: boolean, group: any = null) {
    this._isLoading.next({
      isLoading: isLoading,
      group: group
    })
  }
}

@Component({
  selector: 'app-ghost-element',
  host: { '[class.isLoading]': 'isLoading' },
  templateUrl: './ghost-element.component.html',
  styleUrls: ['./ghost-element.component.scss']
})
export class GhostElementComponent implements OnInit {
  @Input() group: any = null

  public isLoading: boolean = true
  private isLoadingSubscription: Subscription
  private data: Object = {}
  
  ngOnInit(){

  }

  public constructor(private ghost: GhostComponentService) {
    this.isLoadingSubscription = this.ghost.isLoading.subscribe(data => this.updateLoading(data))
  }

  public ngOnDestroy() {
    this.isLoadingSubscription.unsubscribe()
  }

  private updateLoading(data) {
    if (!data) {
      return
    }
    this.setData(data).process()
  }

  private setData(data: Object) {
    this.data = data
    return this
  }

  private process() {
    return this.group
      ? this.groupedLoading()
      : this.setLoading()
  }

  private groupedLoading() {
    return Array.isArray(this.data['group'])
      ? this.groupedByArray()
      : this.groupedByString()
  }

  private groupedByArray() {
    if (this.data['group'].indexOf(this.group) > -1) {
      return this.setLoading()
    }
  }

  private groupedByString() {
    if (this.data['group'] === this.group) {
      return this.setLoading()
    }
  }

  private setLoading() {
    this.isLoading = this.data['isLoading']
  }

}
