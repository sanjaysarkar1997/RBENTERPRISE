let company = [
  { name: "Unicharm", color: "#673AB7" },
  { name: "Asian Paints", color: "#2196F3" },
  { name: "Little Angel", color: "#9f1cbb" },
];

const colorGenerator = (value) => {
  return company.find((ele) => ele.name === value)
    ? company.find((ele) => ele.name === value)
    : { color: "red" };
};

export { colorGenerator, company };
