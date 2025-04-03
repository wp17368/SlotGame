import React from "react";
import { useUser } from "./UserContext";

interface QuantityPickerProps {
  productType: "spin" | "draw";
  quantity: number;
  onQuantityChange: (productType: "spin" | "draw", newQuantity: number) => void;
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({
  productType,
  quantity,
  onQuantityChange,
}) => {
  const { user, shop } = useUser();

  const maxQuantity = Math.floor(
    (user.credits - shop.shoppingCart.total) / shop.pricing[productType]
  );

  const increment = () => {
    const availableQuantity = Math.floor(
      (user.credits - shop.shoppingCart.total) / shop.pricing[productType]
    );

    if (availableQuantity >= 1) {
      onQuantityChange(productType, quantity + 1);
    }
  };

  const decrement = () => {
    onQuantityChange(productType, Math.max(quantity - 1, 0));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      onQuantityChange(productType, Math.min(value, maxQuantity));
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <label htmlFor={`quantity-${productType}`} className="form-label">
            <h6> Quantity</h6>
          </label>
          <div className="input-group">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={decrement}
            >
              -
            </button>
            <input
              type="number"
              className="form-control text-center"
              id={`quantity-${productType}`}
              name="quantity"
              min="0"
              max={maxQuantity}
              step="1"
              value={quantity}
              onChange={handleChange}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={increment}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantityPicker;
