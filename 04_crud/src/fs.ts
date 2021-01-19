async function readFileContent(filename: string): Promise<string> {
  const decoder = new TextDecoder("utf-8");
  const file = await Deno.readFile(filename);
  return decoder.decode(file);
}

// deno-lint-ignore no-explicit-any
export async function readJsonFileContent(filename: string): Promise<any> {
  return JSON.parse(await readFileContent(filename));
}
