const main = async () => {
  const response = await fetch(
    "http://localhost:3000/api/articles/:slug/comments",
  );
  const responseJson = await response.json();
  console.log(responseJson);
};

main();
