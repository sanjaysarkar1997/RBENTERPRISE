let company = [
  { name: "Unicharm", color: "#673AB7" },
  { name: "Asian Paints", color: "#2196F3" },
];

const colorGenerator = (value) => {
  return company.find((ele) => ele.name === value)
    ? company.find((ele) => ele.name === value)
    : { color: "red" };
};

export { colorGenerator, company };
