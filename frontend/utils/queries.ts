export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
}

export const handleSelectedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

export const handlePagination = (direction: 'next' | 'prev') => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: direction === 'next' ? prevFilters.page + 1 : prevFilters.page - 1,
    }));
  };