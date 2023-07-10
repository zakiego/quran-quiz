import * as fs from "fs";

export const saveToJSON = (data: any, path: string) => {
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(path, json);
};
