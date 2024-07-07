import React, { useEffect, useState } from "react";
import ProductModal from "../../components/ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByNameQuery } from "../../products/productsApi";
import {
  getData,
  searchData,
  filterData,
  fetchCategories,
} from "../../products/productsSlice";
import { addToCart } from "../../cart/cartSlice";

export default function Products() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState({
    sort: "",
    category: "",
  });
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, error, isLoading, isSuccess } = useGetProductByNameQuery();

  const { filteredData, categories } = useSelector((state) => state.products);
  const [cartItems, setCartItems] = useState({});

  console.log(categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getData(data.products));
    }
  }, [isSuccess, data, dispatch]);

  const handleIncrement = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setCartItems((prev) => {
      const newCount = (prev[id] || 0) - 1;
      if (newCount < 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [id]: newCount,
        };
      }
    });
  };

  const handleAddToCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleUpdateCart = (item) => {
    const quantity = cartItems[item.id] || 1;
    const itemWithQuantity = { ...item, quantity };
    dispatch(addToCart(itemWithQuantity));
    document.getElementById("my_modal_1").showModal();
    setTimeout(() => {
      document.getElementById("my_modal_1").close();
    }, 1000);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage))
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(filterData(filters));
    dispatch(searchData(search));
  };

  const handleReset = () => {
    setFilters({
      sort: "",
      category: "",
    });
    setSearch("");
  };

  const handleSortChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sort: e.target.value,
    }));
  };

  const handleCategoryChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: e.target.value,
    }));
  };

  const handlePriceChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: parseFloat(e.target.value),
    }));
  };

  return (
    <section>
      <div className="container">
        <div className="mt-[55px] mb-[55px] w-[1280px] h-[218px] bg-base-300 p-[40px] rounded-[8px] ">
          <form onSubmit={handleSearchSubmit}>
            <div className="flex flex-col justify-between gap-[55px]">
              <div className="flex justify-between items-center gap-4">
                <label className="input input-sm input-bordered flex items-center gap-2 w-[244px] h-[32px]">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
                <select
                  value={filters.sort}
                  onChange={handleSortChange}
                  className="select select-sm select-bordered  w-[244px] h-[32px]"
                >
                  <option value="">Sort by A-Z/Z-A</option>
                  <option value="name">A-Z</option>
                  <option value="!name">Z-A</option>
                </select>

                {categories && (
                  <select
                    value={filters.category}
                    onChange={handleCategoryChange}
                    className="select select-sm select-bordered w-full max-w-xs"
                  >
                    <option value="">Select by Category</option>
                    {categories &&
                      categories.map(({ slug, name }) => (
                        <option key={slug} value={slug}>
                          {name}
                        </option>
                      ))}
                  </select>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex justify-between items-center">
                    <p>Select price</p>
                    <p>${filters.price}</p>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    value={filters.price}
                    onChange={handlePriceChange}
                    className="range range-primary w-[244px]"
                  />
                  <div className="flex justify-between">
                    <p>$0</p>
                    <p>max: $1000.00</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-success btn-sm bg-primary w-[244px] h-[32px] text-white"
                  >
                    SEARCH
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm w-[244px] h-[32px] bg-pink-600 text-white"
                    onClick={handleReset}
                  >
                    RESET
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {isLoading && (
          <div className="mt-14 flex items-center justify-center">
            <span
              style={{ zoom: 2 }}
              className="loading loading-spinner loading-lg"
            ></span>
          </div>
        )}

        {!!currentItems?.length && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-14 mb-[30px]">
            {currentItems.map((item) => {
              const { id, price, images, stock, rating, title } = item;
              return (
                <div
                  key={id}
                  className="card card-compact w-[350px] bg-base-300 shadow-[0_2px_10px_0_rgba(255,255,255)] justify-self-center"
                >
                  <figure>
                    <img
                      style={{
                        width: "310px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      src={images[0]}
                      alt={title}
                      className="w-[322px] h-[192px] object-center object-scale-down"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-lg">{title}</h2>
                    <p>Price: {price}$</p>

                    <div className="card-actions justify-end">
                      {cartItems[id] ? (
                        <div className="flex items-center">
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => handleDecrement(id)}
                            disabled={cartItems[id] <= 1}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={cartItems[id]}
                            readOnly
                            className="mx-2 w-12 text-center"
                          />
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => handleIncrement(id)}
                          >
                            +
                          </button>
                          <button
                            className="btn btn-sm btn-primary ml-2"
                            onClick={() => handleUpdateCart(item)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleAddToCart(id)}
                        >
                          Buy Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="join flex items-center justify-end">
          <button
            className="join-item btn text-[14px] leading-[14px] text-[#394E6A] font-[600]"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            PREV
          </button>

          {Array.from(
            { length: Math.ceil(filteredData.length / itemsPerPage) },
            (_, index) => (
              <input
                key={index}
                className="join-item btn btn-square text-[14px] leading-[14px] text-[#394E6A] font-[600]"
                type="radio"
                name="options"
                aria-label={index + 1}
                checked={currentPage === index + 1}
                onChange={() => handlePageChange(index + 1)}
              />
            )
          )}

          <button
            className="join-item btn text-[14px] leading-[14px] text-[#394E6A] font-[600]"
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(filteredData.length / itemsPerPage)
            }
          >
            NEXT
          </button>
        </div>
      </div>

      <ProductModal setRefresh={setRefresh} />
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-fit">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </dialog>
    </section>
  );
}
