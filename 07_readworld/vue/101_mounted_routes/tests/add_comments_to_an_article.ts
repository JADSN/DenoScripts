const main = async () => {
  const response = await fetch(
    "http://localhost:3000/api/articles/:slug/comments",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "comment": {
          "body": "His name was my name too.",
        },
      }),
    },
  );

  const responseJson = await response.json();
  console.log(responseJson);
};

main();
