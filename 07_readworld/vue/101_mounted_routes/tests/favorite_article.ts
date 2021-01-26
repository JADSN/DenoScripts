const main = async () => {
  const response = await fetch(
    "http://localhost:3000/api/articles/:slug/favorite",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "article": {
          "slug": "how-to-train-your-dragon",
          "title": "How to train your dragon",
          "description": "Ever wonder how?",
          "body": "It takes a Jacobian",
          "tagList": ["dragons", "training"],
          "createdAt": "2016-02-18T03:22:56.637Z",
          "updatedAt": "2016-02-18T03:48:35.824Z",
          "favorited": false,
          "favoritesCount": 0,
          "author": {
            "username": "jake",
            "bio": "I work at statefarm",
            "image": "https://i.stack.imgur.com/xHWG8.jpg",
            "following": false,
          },
        },
      }),
    },
  );

  const responseJson = await response.json();
  console.log(responseJson);
};

main();
