import React, { useState } from "react";
import { Products, useUser } from "./UserContext";
import QuantityPicker from "./QuantityPicker";

function ShopModal() {
  const { shop, updateShop } = useUser();
  const { user, updateUser } = useUser();
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
    const updatedProducts = Object.keys(user.products).reduce((acc, key) => {
      const productKey = key as keyof Products;
      acc[productKey] =
        (user.products[productKey] || 0) +
        (shop.shoppingCart.products[productKey] || 0);
      return acc;
    }, {} as Products);

    updateUser({
      products: updatedProducts,
      credits: user.credits - shop.shoppingCart.total,
    });

    updateShop({
      shoppingCart: {
        ...shop.shoppingCart,
        products: { spin: 0, draw: 0 },
        total: 0,
      },
    });
  }

  if (!shop.isShopModalOpen) return null;

  return (
    <div className="modal show d-block text-center" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header justify-content-between">
            <h5 className="modal-title">Shop</h5>
            <button
              type="button"
              className="close btn close-btn p-1"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="modal-body text-center ">
            <div className="row align-items-end">
              <div className="col product-card">
                <h4>Bonus spin</h4>
                <p>Buy yourself another spin!</p>
                <QuantityPicker
                  productType="spin"
                  quantity={shop.shoppingCart.products.spin}
                  onQuantityChange={handleQuantityChange}
                />
              </div>

              <div className="col product-card">
                <h4>Bonus draw</h4>
                <p>In case you only need to spin one reel to hit jackpot!</p>
                <QuantityPicker
                  productType="draw"
                  quantity={shop.shoppingCart.products.draw}
                  onQuantityChange={handleQuantityChange}
                />
              </div>
            </div>
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
