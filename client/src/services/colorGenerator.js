let company = [
  { name: "Unicharm", color: "#673AB7" },
  { name: "Asian Paints", color: "#2196F3" },
  { name: "Little Angel", color: "#4caf50" },
  { name: "Bajaj", color: "#801783" },
];

const colorGenerator = (value) => {
  return company.find((ele) => ele.name === value)
    ? company.find((ele) => ele.name === value)
    : { color: "red" };
};

export { colorGenerator, company };
