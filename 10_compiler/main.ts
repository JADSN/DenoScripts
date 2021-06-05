const fileNames: string[] = [];

for await (const dirEntry of Deno.readDir("src")) {
  console.log(dirEntry);

  if (dirEntry.isFile) {
    fileNames.push(dirEntry.name);
  }
}

fileNames.forEach((item) => {
  console.log("ENTROU");

  // TODO: Obtain name without extension

  const itemSource = `./src/${item}`;

  const itemWihoutExtension = item.split(".").slice(0, -1).join("");

  const itemOutput = `./public/${itemWihoutExtension}.js`;

  console.log(itemSource);
  console.log(itemOutput);

  Deno.run({
    cmd: ["deno", "bundle", itemSource, itemOutput],
    stdout: "piped",
    stderr: "piped",
    stdin: "piped",
  });
});

// const proc = Deno.run({
//   cmd: ["deno", "bundle", "./src/second.ts", "./public/second.js"],
//   stdout: "piped",
//   stderr: "piped",
//   stdin: "piped",
// });

// console.log(await proc.status());
// const data = await proc.stderrOutput();
// const output = new TextDecoder().decode(data);
// console.log(output);
