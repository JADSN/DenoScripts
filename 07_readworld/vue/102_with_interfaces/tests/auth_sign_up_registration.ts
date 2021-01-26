const main = async () => {
  const response = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "user": {
        "username": "Jacob",
        "email": "jake@jake.jake",
        "password": "jakejake",
      },
    }),
  });

  const responseJson = await response.json();
  console.log(responseJson);
};

main();
