import React, { useState } from "react";
import { useUser } from "./UserContext";
import QuantityPicker from "./QuantityPicker";

function ShopModal() {
  const { shop, updateShop } = useUser();

  function onClose() {
    updateShop({ ...shop, isShopModalOpen: false });
  }

  const updatedTotal =
    shop.shoppingCart.products.draw * shop.pricing.draw +
    shop.shoppingCart.products.spin * shop.pricing.spin;

  function handleQuantityChange(
    productType: "spin" | "draw",
    newQuantity: number
  ) {
    const updatedProducts = {
      ...shop.shoppingCart.products,
      [productType]: newQuantity,
    };

    const updatedTotal =
      updatedProducts.spin * shop.pricing.spin +
      updatedProducts.draw * shop.pricing.draw;

    updateShop({
      ...shop,
      shoppingCart: {
        ...shop.shoppingCart,
        products: updatedProducts,
        total: updatedTotal, // Directly update the total after quantity change
      },
    });
  }

  function onCheckout() {
    console.log("Checkout - total:", shop.shoppingCart.total);
    console.log(shop);
  }

  if (!shop.isShopModalOpen) return null;

  return (
    <div className="modal show d-block text-center" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header justify-content-between">
            <h5 className="modal-title">Shop</h5>
            <button type="button" className="close p-1" onClick={onClose}>
              Close
            </button>
          </div>
          <div className="modal-body text-center">
            <div className="row">
              {/* Bonus Spin */}
              <div className="col">
                <h4>Bonus spin</h4>
                <p>Buy yourself another spin!</p>
                <QuantityPicker
                  productType="spin"
                  quantity={shop.shoppingCart.products.spin}
                  onQuantityChange={handleQuantityChange}
                />
              </div>

              {/* Bonus Draw */}
              <div className="col">
                <h4>Bonus draw</h4>
                <p>In case you only need to spin one reel to hit jackpot!</p>
                <QuantityPicker
                  productType="draw"
                  quantity={shop.shoppingCart.products.draw} // ✅ Fixed wrong prop
                  onQuantityChange={handleQuantityChange}
                />
              </div>
            </div>

            {/* Total & Checkout */}
            <div className="row mt-5">
              <div className="col">
                <h5>Total: {shop.shoppingCart.total} credits</h5>
              </div>
              <div className="col align-content-end">
                <button className="btn btn-warning m-0" onClick={onCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopModal;
