import {Component, Input} from '@angular/core';
import {User} from "../../../shared/classes/user";

@Component({
  moduleId: module.id,
  selector: 'user-item',
  templateUrl: './user-item.component.html'
})
export class UserItemComponent {
  @Input() user:User
}
