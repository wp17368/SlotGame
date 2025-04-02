import React, { useState } from "react";
import { useUser } from "./UserContext";
function QuantityPicker() {
  const [quantity, setQuantity] = useState(1);
  const { user, updateUser } = useUser();
  const increment = () => {
    setQuantity(Math.min(quantity + 1, 100));
  };

  const decrement = () => {
    setQuantity(Math.max(quantity - 1, 1));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };
  return (
    <div className="container ">
      <div className="row">
        <div className="col">
          <label htmlFor="quantity" className="form-label">
            Quantity
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
              id="quantity"
              name="quantity"
              min="1"
              max={user.credits}
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
}

export default QuantityPicker;
