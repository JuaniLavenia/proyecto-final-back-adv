const { Transport } = require("winston");
const Incident = require("../models/Incident");

class IncidentTransport extends Transport {
  constructor(opts) {
    super(opts);
  }

  log(info, callback) {
    if (info.level === "error") {
      setImmediate(async () => {
        const incident = new Incident({
          message: {
            date: new Date().toLocaleString(),
            error: info.message,
          },
        });
        await incident.save();

        callback();
      });
    }
  }
}

module.exports = IncidentTransport;
