import { Address } from './address.model';

export class Admin {
    public constructor(
        public _id?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public address?: Address,
        public password?: string,
        public passwordConfirm?: string
        ) {
    }
}