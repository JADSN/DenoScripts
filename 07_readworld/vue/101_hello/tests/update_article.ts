const main = async () => {
  const response = await fetch("http://localhost:3000/api/articles/:slug", {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "article": {
        "title": "Did you train your dragon?",
      },
    }),
  });

  const responseJson = await response.json();
  console.log(responseJson);
};

main();
