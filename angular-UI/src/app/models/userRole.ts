import * as _ from 'lodash';

export class UserRole {
    public role: string;
    constructor(userRole?: {
         role
    }) {
        if (userRole) {
            _.assignIn(this, userRole);
    }
}
}
