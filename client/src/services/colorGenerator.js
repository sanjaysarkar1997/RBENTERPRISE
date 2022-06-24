let company = [
  { name: "Unicharm", color: "#673AB7" },
  { name: "Asian Paints", color: "#2196F3" },
  { name: "Bajaj", color: "#801783" },
  { name: "Paree", color: "#42a7ff" },
];

const colorGenerator = (value) => {
  return company.find((ele) => ele.name === value)
    ? company.find((ele) => ele.name === value)
    : { color: "red" };
};

export { colorGenerator, company };
