import * as models from "./models";

export const yo = (parm: models.LogEntry) => {
  return `
    your message is: ${parm.message},
    your data is ${parm.data},
    your time is ${parm.time},
    your level is ${parm.level}
  `;
}