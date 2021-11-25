import { Admin } from './admin.model';
import { UserModel } from './user.model';

// import { Product } from './product';

export class Cart {
    public constructor(
        public customer?: UserModel | Admin,
        public date?: Date,
        public _id?: string,
        public cityName?: string,

        public cartProducts: {
            _id?: string,
            // product?: Product,
            quant?: number,
            totalPrice?: number
        }[] = [],
        public overallPrice: number = 0,
        public active: boolean = true) {
    }
}