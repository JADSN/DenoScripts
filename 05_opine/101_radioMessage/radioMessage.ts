interface RadioMessage {
  datetime: string;
  dB: number;
  direction: string;
  protocol: string;
  signal: number;
  clockoffset: number;
  frequencyHz: number;
  message: string;
}

export const FILENAME = "./db.txt";

export async function obtainAllRadioMessageFromFile(
  filename: string,
): Promise<RadioMessage[]> {
  const file = await Deno.readTextFile(filename);

  const pattern =
    /^(?<datetime>\d{6}_\d{6})\s+(?<db>\d{2}\.\d{3})\s(?<direction>Rx)\s(?<protocol>FT8)\s+(?<signal>-?\d+)\s+(?<clockoffset>\d+\.\d)\s+(?<frequencyHz>\d+)\s+(?<message>.*)$/gm;

  const linesFromFile = [...file.matchAll(pattern)];

  return linesFromFile.map((line) =>
    <RadioMessage> {
      datetime: line.groups!.datetime,
      dB: parseFloat(line.groups!.db),
      direction: line.groups!.direction,
      protocol: line.groups!.protocol,
      signal: parseInt(line.groups!.signal),
      clockoffset: parseFloat(line.groups!.clockoffset),
      frequencyHz: parseInt(line.groups!.frequencyHz),
      message: line.groups!.message,
    }
  );
}
