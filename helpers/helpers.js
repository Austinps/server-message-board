export const filteredArray = (array, itemToRemove) => {
  return array.filter((item) => item.toString() !== itemToRemove.toString());
};

export const paginateResults = (pageNumber, limit, results) => {
  return results.slice(pageNumber * limit - limit, pageNumber * limit);
};

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
