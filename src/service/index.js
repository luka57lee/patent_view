import axios from "axios";
import { dateTimeToDateString } from "../utils/date";

export const getPatent = (firstDay, organization) => {
  return axios
    .post("https://api.patentsview.org/patents/query", {
      q: {
        _and: [
          {
            _gte: {
              patent_date: dateTimeToDateString(firstDay),
            },
          },
          { assignee_organization: organization },
        ],
      },
      f: ["patent_number", "patent_date", "cpc_section_id"],
      s: { patent_date: "asc" },
      o: { page: 1, per_page: 10000000 },
    })
    .then((res) => {
      if (res && res.data) {
        return res.data;
      }
      return null;
    });
};
