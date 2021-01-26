const main = async () => {
  const response = await fetch(
    "http://localhost:3000/api/articles/:slug/comments/:id",
    {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    },
  );

  const responseJson = await response.json();
  console.log(responseJson);
};

main();
