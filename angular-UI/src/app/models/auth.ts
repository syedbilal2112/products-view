import * as _ from 'lodash';
import { UserRole } from '../../app/models/userRole';

export class Auth {
  _id: number;
  name: string;
  email: string;
  role: string;
  authenticated = true;


  constructor(auth?: {
    id: number;
    name: string;
    email: string;
    role: string;
  }) {
    if (auth) {
      _.assignIn(this, auth);
      this.authenticated = false;
    }
  }
}
