import data from "./data.json";
import fs from "fs";

data.forEach((x) => {
	delete x.commitSummary;
});

fs.writeFileSync(__dirname + "/data.json", JSON.stringify(data, null, "\t"));
