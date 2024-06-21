import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getData, filterData } from "../../products/productsSlice";
import { useGetProductByNameQuery } from "../../products/productsApi";
import img from "../../assets/Background.png";

export default function Home() {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetProductByNameQuery();
  const { filteredData } = useSelector((state) => state.products);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getData(data.products));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    dispatch(filterData("rating"));
  }, [data, dispatch]);

  return (
    <>
      <div className="container">
        <div className="flex items-center justify-between mt-[50px] mb-[50px]">
          <div className="flex-col items-center justify-between w-[496px] h-[440px] space-y-7 pt-[25px]">
            <h1 className="text-[60px] leading-[60px] text-[#394E6A] font-[700] tracking-[-1.5px]">
              We are changing the way people shop
            </h1>
            <p className="leading-[32px] text-[18px]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              repellat explicabo enim soluta temporibus asperiores aut obcaecati
              perferendis porro nobis.
            </p>
            <Link
              className="btn bg-[#057AFF] text-white text-[14px]"
              to={"/products"}
            >
              OUR PRODUCTS
            </Link>
          </div>
          <img src={img} alt="img" />
        </div>

        <div className="flex-col items-start justify-between mt-[60px] mb-[100px]">
          <div className="pb-[30px] border-b-2">
            <p className="text-[30px] leading-[36px] tracking-[1.5px] font-[400] text-[#394E6A]">
              Featured Products
            </p>
          </div>

          {isLoading && (
            <div className="mt-14 flex items-center justify-center">
              <span
                style={{ zoom: 2 }}
                className="loading loading-spinner loading-lg"
              ></span>
            </div>
          )}
          <div className="flex items-center justify-between gap-5 mt-[40px]">
            {filteredData.slice(0, 3).map((product) => (
              <div key={product.id} className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="rounded-xl w-[322px] h-[192px] object-center object-scale-down"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-[20px] leading-[28px] text-[#394E6A] ">
                    {product.title}
                  </h2>
                  <p className="text-[16px] leading-[24px] text-[#463AA1] font-[400]">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
