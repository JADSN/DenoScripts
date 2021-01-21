// TODO: Change datetime from bitint to date
// TODO: Change datetime to epcoch

export interface RadioMessage {
  datetime: bigint;
  decibels: number;
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
    /^(?<year>\d{2})(?<month>\d{2})(?<day>\d{2})_(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})\s+(?<db>\d{2}\.\d{3})\s(?<direction>Rx)\s(?<protocol>FT8)\s+(?<signal>-?\d+)\s+(?<clockoffset>\d+\.\d)\s+(?<frequencyHz>\d+)\s+(?<message>.*)$/gm;

  const linesFromFile = [...file.matchAll(pattern)];

  const data = linesFromFile.map((line) => {
    const yearNow = new Date().getFullYear();
    const normalizeYear = parseInt(
      yearNow.toString().substr(0, 2) + line.groups!.year,
    );

    const timestamp = BigInt(new Date(
      normalizeYear,
      // Começa com 0 para Janeiro até 11 para Dezembro.
      parseInt(line.groups!.month) - 1,
      parseInt(line.groups!.day),
      parseInt(line.groups!.hour),
      parseInt(line.groups!.minute),
      parseInt(line.groups!.second),
    ).getTime());

    return <RadioMessage> {
      datetime: timestamp,
      decibels: parseFloat(line.groups!.db),
      direction: line.groups!.direction,
      protocol: line.groups!.protocol,
      signal: parseInt(line.groups!.signal),
      clockoffset: parseFloat(line.groups!.clockoffset),
      frequencyHz: parseInt(line.groups!.frequencyHz),
      message: line.groups!.message,
    };
  });

  return data;
}
