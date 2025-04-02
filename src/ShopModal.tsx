import React, { useState } from "react";
import { useUser } from "./UserContext";
import QuantityPicker from "./QuantityPicker";
function ShopModal() {
  const { user, updateUser } = useUser();
  const { buttons, updateButtons } = useUser();
  const { shop, updateShop } = useUser();
  const [show, setShow] = useState(false);
  function onClose() {
    updateShop({ isShopModalOpen: false });
  }
  if (!shop.isShopModalOpen) return null;
  return (
    <div className="modal show d-block text-center" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header justify-content-between ">
            <h5 className="modal-title">Select an option</h5>
            <button type="button" className="close p-1" onClick={onClose}>
              close
            </button>
          </div>
          <div className="modal-body text-center">
            <div className="row mb-2">
              <div className="col">
                <QuantityPicker></QuantityPicker>
              </div>

              <div className="col align-content-end">
                <button
                  className="btn btn-success m-0"
                  onClick={() => alert("Buying Spins...")}
                >
                  Buy Spins
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <QuantityPicker></QuantityPicker>
              </div>
              <div className="col align-content-end">
                <button
                  className="btn btn-warning m-0"
                  onClick={() => alert("Buying Draws...")}
                >
                  Buy Draws
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
