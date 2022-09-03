export const getSeries = (now, data) => {
  const firstDay = new Date(now.getFullYear() - 5, now.getMonth(), 1);

  const cpcs = ["A", "B", "C", "D", "E", "F", "G", "H", "R"]; // There are 9 CPCs including cpc_section_id isn't available
  const cpcFrequency = {};

  for (let patent of data.patents) {
    const d = new Date(patent.patent_date);
    const year = d.getFullYear();
    const month = d.getMonth();

    const dateKey = `${year}-${
      month + 1 < 10 ? `0${month + 1}` : month + 1
    }-01`;

    let cpcId = "R";
    if (
      patent.cpcs &&
      patent.cpcs.length > 0 &&
      patent.cpcs[0].cpc_section_id
    ) {
      cpcId = patent.cpcs[0].cpc_section_id;
    }

    if (cpcFrequency[dateKey] === undefined) cpcFrequency[dateKey] = {};
    if (cpcFrequency[dateKey][cpcId] === undefined) {
      cpcFrequency[dateKey][cpcId] = 0;
    }
    cpcFrequency[dateKey][cpcId]++;
  }

  const newSeries = [];
  for (let cpc of cpcs) {
    const data = [];
    let year = firstDay.getFullYear();
    let month = firstDay.getMonth();
    for (let i = 0; i < 5 * 12; i++) {
      const dateKey = `${year}-${
        month + 1 < 10 ? `0${month + 1}` : month + 1
      }-01`;
      
      data.push(
        cpcFrequency[dateKey] === undefined ||
          cpcFrequency[dateKey][cpc] === undefined
          ? 0
          : cpcFrequency[dateKey][cpc]
      );
      month = (month + 1) % 12;
      if (month === 0) year++;
    }
    newSeries.push({
      name: cpc,
      data,
    });
  }

  return newSeries;
};

export const getCategories = (now) => {
  const lastDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDay = new Date(now.getFullYear() - 5, now.getMonth(), 1);

  const newCategory = [];
  for (let d = firstDay; d <= lastDay; ) {
    newCategory.push(`${d.toLocaleDateString("en-US")} GMT`);
    const month = (d.getMonth() + 1) % 12;
    const year = d.getFullYear() + ((d.getMonth() + 1) % 12 === 0 ? 1 : 0);
    d = new Date(year, month, 1);
  }
  return newCategory;
};
