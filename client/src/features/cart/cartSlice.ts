import {
    createSelector,
    createSlice,
    PayloadAction,
    Reducer,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export type CartProduct = {
    _id: string;
    name: string;
    price: number;
    desc: string;
    imageURL: string;
    cartQuantity: number;
};

type CartState = {
    // cartQuantity: 0;
    // totalPrice: 0;
    cartItems: CartProduct[];
};

const initialState: CartState = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems')!)
        : [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<CartProduct>) => {
            const prodId = action.payload._id;
            const existingIndex = state.cartItems.findIndex(
                (item) => item._id === prodId
            );

            if (existingIndex >= 0) {
                const currentQuantity =
                    state.cartItems[existingIndex].cartQuantity || 0;
                const addQuantity = action.payload.cartQuantity || 1;
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    cartQuantity: currentQuantity + addQuantity,
                };
            } else {
                const tempProductItem = { ...action.payload };
                state.cartItems.push(tempProductItem);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        decreaseProduct: (state, action: PayloadAction<CartProduct>) => {
            const prodId = action.payload._id;
            const existingIndex = state.cartItems.findIndex(
                (item) => item._id === prodId
            );
            if (existingIndex >= 0) {
                const currentQuantity =
                    state.cartItems[existingIndex].cartQuantity || 0;
                if (currentQuantity > 1) {
                    state.cartItems[existingIndex].cartQuantity =
                        currentQuantity - 1;
                }
            }
        },
        removeProduct: (state, action: PayloadAction<CartProduct>) => {
            const prodId = action.payload._id;
            state.cartItems = state.cartItems.filter((item) => {
                return item._id !== prodId;
            });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearAllProduct: (state) => {
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
    },
});

export const { addProduct, decreaseProduct, removeProduct, clearAllProduct } =
    cartSlice.actions;
export default cartSlice.reducer as Reducer<CartState>;

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const getMemoizedTotalQuantity = createSelector(
    (state: RootState) => {
        return state.cart.cartItems;
    },
    (items) => {
        const totalQuantity = items.reduce((accu, currItem) => {
            return accu + (currItem.cartQuantity || 0);
        }, 0);
        return totalQuantity;
    }
);
export const getMemoizedTotalPrice = createSelector(
    (state: RootState) => {
        return state.cart.cartItems;
    },
    (items) => {
        const totalPrice = items.reduce((accu, currItem) => {
            return accu + (currItem.cartQuantity || 0) * currItem.price;
        }, 0);
        return totalPrice;
    }
);
