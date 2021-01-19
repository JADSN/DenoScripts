interface RadioMessage {
  utc: string;
  dB: number;
  direction: string;
  protocol: string;
  signal: number;
  clockoffset: number;
  frequencyHz: number;
  message: string;
}

const file = await Deno.readTextFile("./db.txt");

const pattern =
  /^(?<datetime>\d{6}_\d{6})\s+(?<db>\d{2}\.\d{3})\s(?<direction>Rx)\s(?<protocol>FT8)\s+(?<signal>-?\d+)\s+(?<clockoffset>\d+\.\d)\s+(?<frequencyHz>\d+)\s+(?<message>.*)$/gm;

const fileContentsLines = [...file.matchAll(pattern)];

const data = fileContentsLines.map((line) => {
  // TODO: Testar sem exclamação

  // TODO: Opine -> Mostrar na tela o `message`
  // https://dev.to/craigmorten/opine-tutorial-part-1-express-for-deno-5nb
  // https://dev.to/craigmorten/kickstart-your-deno-web-project-with-the-opine-cli-1mkd
  // https://gist.github.com/asos-craigmorten/944d0d14130ac5d1f297829010836a73
  // https://morioh.com/p/d834cd07bcae

  // const groups = line.groups!;

  const message: RadioMessage = {
    utc: line.groups!.datetime,
    dB: parseFloat(line.groups!.db),
    direction: line.groups!.direction,
    protocol: line.groups!.protocol,
    signal: parseInt(line.groups!.signal),
    clockoffset: parseFloat(line.groups!.clockoffset),
    frequencyHz: parseInt(line.groups!.frequencyHz),
    message: line.groups!.message,
  };

  return message;
});

console.log(data);
