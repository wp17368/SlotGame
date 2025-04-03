import React, { useState } from "react";
import { useUser } from "./UserContext";
import activateSpin from "./SlotMachine";
import SlotMachine from "./SlotMachine";
import ShopModal from "./ShopModal";
function StatusBar() {
  const { user, updateUser } = useUser();
  const { buttons, updateButtons } = useUser();
  const { shop, updateShop } = useUser();
  function openShopModal() {
    updateShop({ isShopModalOpen: true });
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="row status-bar text-center align-items-center mt-1 mb-1">
        {[
          { label: "Credits", value: user.credits },
          {
            label: "Bonus Spins",
            value: user.products.spin,
          },
          { label: "Bonus Draws", value: user.products.draw },
        ].map((item, index) => (
          <div className="col" key={index}>
            <p>
              {item.label}: {item.value}
            </p>
          </div>
        ))}
        <div className="col">
          <button
            className="btn buy-btn"
            disabled={buttons.buyButton}
            onClick={openShopModal}
          >
            Buy
          </button>
          <ShopModal></ShopModal>
        </div>
      </div>
    </div>
  );
}

export default StatusBar;
