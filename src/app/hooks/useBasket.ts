import { useState } from "react";
import { CartItem } from "../../lib/types/search";

const CART_STORAGE_KEY = "cartData";

const isCartItem = (value: unknown): value is CartItem => {
    if (typeof value !== "object" || value === null) return false;
    const item = value as Partial<CartItem>;
    return (
        typeof item._id === "string" &&
        typeof item.quantity === "number" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        typeof item.image === "string"
    );
};

// The basket lives in localStorage, which any other tab, an older build of this
// app, or the user's own devtools can write to. This hook runs at the App root,
// so a throw here blanks the whole page: read defensively and drop anything that
// is not a well-formed cart instead of trusting what comes back.
const readStoredCart = (): CartItem[] => {
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartJson) return [];

    try {
        const parsed: unknown = JSON.parse(cartJson);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(isCartItem);
    } catch {
        return [];
    }
};

const useBasket = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>(readStoredCart);

    const saveCart = (cartUpdate: CartItem[]) => {
        setCartItems(cartUpdate);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartUpdate));
    };

    const onAdd = (input: CartItem) => {
        const exist: CartItem | undefined = cartItems.find(
            (item: CartItem) => item._id === input._id
        );
        if (exist) {
            saveCart(
                cartItems.map((item: CartItem) =>
                    item._id === input._id
                        ? { ...exist, quantity: exist.quantity + 1 }
                        : item
                )
            );
        } else {
            saveCart([...cartItems, { ...input }]);
        }
    };

    const onRemove = (input: CartItem) => {
        const exist: CartItem | undefined = cartItems.find(
            (item: CartItem) => item._id === input._id
        );
        // A basket rendered from stale props can ask to decrement a line that is
        // no longer there; reading .quantity off the miss would throw.
        if (!exist) return;

        if (exist.quantity === 1) {
            saveCart(
                cartItems.filter((item: CartItem) => item._id !== input._id)
            );
        } else {
            saveCart(
                cartItems.map((item: CartItem) =>
                    item._id === input._id
                        ? { ...exist, quantity: exist.quantity - 1 }
                        : item
                )
            );
        }
    };

    const onDelete = (input: CartItem) => {
        saveCart(cartItems.filter((item: CartItem) => item._id !== input._id));
    };

    const onDeleteAll = () => {
        setCartItems([]);
        localStorage.removeItem(CART_STORAGE_KEY);
    };

    return {
        cartItems,
        onAdd,
        onRemove,
        onDelete,
        onDeleteAll,
    };
};

export default useBasket;
