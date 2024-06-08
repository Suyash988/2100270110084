import { handleInputChange } from "@/utils/queries"
import { ChangeEvent } from "react"

const Filter = () =>{
    function handleSelectedChange(event: ChangeEvent<HTMLSelectElement>): void {
        throw new Error("Function not implemented.")
    }

    return(
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="mb-4">
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={filters.company}
            onChange={handleInputChange}
            className="border p-2 rounded mr-2"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={filters.category}
            onChange={handleInputChange}
            className="border p-2 rounded mr-2"
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleInputChange}
            className="border p-2 rounded mr-2"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleInputChange}
            className="border p-2 rounded mr-2"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={filters.rating}
            onChange={handleInputChange}
            className="border p-2 rounded mr-2"
          />
          <label className="mr-2">
            <input
              type="checkbox"
              name="availability"
              checked={filters.availability}
              onChange={handleInputChange}
            />
            Availability
          </label>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleSelectedChange}
            className="border p-2 rounded mr-2"
          >
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="discount">Discount</option>
          </select>
          <select
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleSelectedChange}
            className="border p-2 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
    )
}

export default Filter;