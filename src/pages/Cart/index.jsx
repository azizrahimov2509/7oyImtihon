import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartItem } from "../../cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (id) => {
    dispatch(updateCartItem({ id, increment: true }));
  };

  const handleDecrement = (id) => {
    dispatch(updateCartItem({ id, increment: false }));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [showToast, setShowToast] = useState(false);

  const handleOrderClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="container">
      <h1 className="text-[30px] tracking-[1.5px] leading-[36px] text-slate-900 mb-[30px] mt-[30px]  border-b-slate-600">
        Shopping Cart
      </h1>
      <div className="flex items-start justify-between  border-t-2 pt-5">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="card card-compact w-[755px] h-[153px] bg-base-300 shadow-md mb-4 p-4 flex justify-between items-start "
              >
                <div className="flex items-center justify-between gap-6">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-[128px] h-[128px]"
                  />
                  <div className="ml-4 flex  justify-between gap-[40px] w-[466px]">
                    <div className=" flex flex-col gap-2">
                      <p className="text-[14px]">{item.title}</p>
                      <p className="text-[12px] text-gray-400">
                        {item.category}
                      </p>

                      <p className="text-[14px] flex items-center">
                        Color:
                        <span className="bg-[red] w-[10px] h-[10px] rounded-full inline-block ml-2"></span>
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-[10px]">
                      <p>Amount</p>
                      <div className="flex">
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleDecrement(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="mx-2 w-12 text-center"
                        />
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleIncrement(item.id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-primary"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[14px]">Price for 1</p>
                      <p className="text-[14px]">${item.price}</p>
                      <p className="text-[14px]">Total price</p>
                      <p>Total: ${Math.ceil(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-[35px]">
          <div className="card card-compact w-[325px] h-[208px] bg-base-300 shadow-md p-[20px] flex flex-col gap-[14px]">
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <p className="text-[12px] text-slate-700">Subtotal:</p>
              <h2 className="text-[12px] text-slate-700">
                ${Math.ceil(totalAmount)}
              </h2>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <p className="text-[12px] text-slate-700">Shipping:</p>
              <p className="text-[12px] text-slate-700">$5.00</p>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <p className="text-[12px] text-slate-700">Tax:</p>
              <p className="text-[12px] text-slate-700">$115.00</p>
            </div>
            <div className="flex justify-between pb-2">
              <p className="text-[14px] text-slate-700">Order Total:</p>
              <h2 className="text-[14px] text-slate-700">
                ${Math.ceil(totalAmount + 5 + 115)}
              </h2>
            </div>
          </div>
          <div>
            <div>
              <button
                className="btn bg-blue-500 w-[325px] text-[white]"
                onClick={handleOrderClick}
              >
                ORDER
              </button>
            </div>

            {showToast && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-6 rounded-lg z-50">
                <div className="text-center">
                  <div className="alert alert-success">
                    <span>Message sent successfully.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
