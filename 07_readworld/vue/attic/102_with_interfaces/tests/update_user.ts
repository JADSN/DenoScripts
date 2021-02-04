const main = async () => {
  const response = await fetch("http://localhost:3000/api/user", {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "user": {
        "email": "jake@jake.jake",
        "bio": "I like to skateboard",
        "image": "https://i.stack.imgur.com/xHWG8.jpg",
      },
    }),
  });

  const responseJson = await response.json();
  console.log(responseJson);
};

main();
