// Start listening on port 8080 of localhost.
const server = Deno.listen({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
  // In order to not be blocking, we need to handle each connection individually
  // without awaiting the function
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const htmlFile = await Deno.readFile("./public/index.html");
    const decoder = new TextDecoder();
    const htmlString = decoder.decode(htmlFile);

    const htmlBody = new Response(htmlString, {
      status: 200,
      headers: { "content-type": "text/plain" },
    });

    requestEvent.respondWith(htmlBody);
  }
}
