// https://lyty.dev/deno/deno-web-server.html
// https://frontendmasters.com/courses/intro-deno/
// https://dev.to/otanriverdi/let-s-explore-deno-by-building-a-live-reloader-j47

import { serve } from "https://deno.land/std@0.97.0/http/server.ts";

// Deno.watchFs(["/", "public"]);

const server = serve({ port: 8080 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8080/`);

for await (const request of server) {
  // Read the index.html file and serve it
  const htmlFile = await Deno.readFile("./public/index.html");

  // Decodes your html file to strings before sending
  const decoder = new TextDecoder();
  const htmlString = decoder.decode(htmlFile);

  request.respond({ status: 200, body: htmlString });
}
