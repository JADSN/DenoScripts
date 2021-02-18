import { exists, existsSync } from "https://deno.land/std@0.87.0/fs/mod.ts";

const args: string[] = Deno.args;
const urlTarget: string = args[0];

const filename = `request-${Date.now()}.txt`
const folderDestPath = `requests/`;

console.log(`[URL]: ${urlTarget}`)

const myHeaders = new Headers();
myHeaders.set("User-Agent", "UNKNOWN");
myHeaders.set("Sec-Fetch-Mode", "no-cors");
myHeaders.set("Sec-Fetch-Site", "cross-site");
myHeaders.set("Sec-Fetch-User", "?1");
myHeaders.set("Sec-Fetch-Dest", "empty");
myHeaders.set("Accept-Encoding", "gzip, deflate");
myHeaders.set("Accept-Language", "en-US,en;q=0.9");

// * UTILS - START

// * Write some content in file
function writeInFile(filename: string, content: string): void {
  const options: Deno.WriteFileOptions = { append: true, create: true }
  const write = Deno.writeTextFile(filename, content, options);
  write.then(() => console.log(`File written to ${filename}`));
}

// * Obtain headers of Response.
function obtainResponseHeaders(headers: Headers): string[] {
  // * Obtain reponse header keys and values
  // TODO: Use forEach of Hearders interface
  const headerKeys: string[] = Array.from(headers.keys())
  const headerValues: string[] = Array.from(headers.values())
  const headersResult: string[] = headerKeys.map((headeKey, idx) => {
    return headeKey.concat(": ", headerValues[idx]);
  })

  return headersResult;
}

// * Normalize values of headers
function headersToString(headers: string[]): string {

  let result = "";
  for (const header of headers) {
    const kv = header.split(/:(.+)/);
    const key = kv[0];
    const value = kv[1].trim();

    result += `< ${key}: ${value}`
    result += '\n'

  }

  result += '\n'

  return result
}


async function makeFetch(): Promise<void> {
  await fetch(request)
    .then((async resp => {

      console.log("\n\n=== BEGIN RESPONSE ===");

      writeInFile(`${folderDestPath}${filename}`, "HEADER 1\n");

      const header1: string[] = obtainResponseHeaders(resp.headers);
      const header1String: string = headersToString(header1);

      writeInFile(`${folderDestPath}${filename}`, header1String);
      writeInFile(`${folderDestPath}${filename}`, "BODY 1\n");
      writeInFile(`${folderDestPath}${filename}`, `${await resp.text()}`);

      console.log("\n\n=== END RESPONSE ===");
    }))
}

// * UTILS - END

const requestInit: RequestInit = <RequestInit>{
  // body: null,
  method: "GET",
  redirect: "follow",
  // mode: "no-cors",
  // keepalive: true,
  headers: myHeaders
}

console.log(requestInit);

console.log("=== BEGIN REQUEST ===\n\n");

const request: Request = new Request(urlTarget, requestInit);

console.log(request.method);
console.log(request.headers);
console.log(request.body!);

console.log("\n\n=== END REQUEST ===");

// * RESPONSE

console.log("\n\n=== BEGIN RESPONSE ===");



async function main(): Promise<void> {

  const isFolderCreated = await exists(`requests`);

  if (isFolderCreated) {
    await makeFetch()
  } else {
    Deno.mkdir('requests');
    await makeFetch()

  }
  // Deno.mkdir("requests")



}

await main()
