import * as fs from "fs";

/*
    This function saves the given JSON to a file.
    Because terminal can't show proper arabic characters.
*/
export const saveJsonToFile = (json: any) => {
  fs.writeFileSync(`${__dirname}/result.json`, JSON.stringify(json, null, 2));
};
