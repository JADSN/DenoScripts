const main = async () => {
  const response = await fetch("http://localhost:3000/api/articles", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "article": {
        "title": "How to train your dragon",
        "description": "Ever wonder how?",
        "body": "You have to believe",
        "tagList": ["reactjs", "angularjs", "dragons"],
      },
    }),
  });

  const responseJson = await response.json();
  console.log(responseJson);
};

main();
