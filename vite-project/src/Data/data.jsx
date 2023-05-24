import oregon_county_pop from "./oregon_county_pop";

export const oregon_county_pop_data = () => {
  let returnArray = [];

  for (let f of oregon_county_pop.features) {
    let returnItem = {};

    returnItem.id = f.properties.admin;
    returnItem.type = f.properties.admin;
    returnItem.count = f.properties.pop_est;
    returnArray.push(returnItem);
  }

  returnArray.sort((a, b) => {
    return a.count - b.count;
  });

  returnArray.reverse();

  returnArray = returnArray.slice(0, 17);

  return returnArray;
};

export const oregon_county_pop_geo_data = () => {
  return oregon_county_pop;
};

export const color_breaks = () => {
  const alpha = 0.65;

  const colorBreaks = [
    { rgba: [255, 255, 255, 0], break: 0 },
    { rgba: [161, 217, 155, alpha], break: 25 },
    { rgba: [116, 196, 118, alpha], break: 90 },
    { rgba: [65, 171, 93, alpha], break: 150 },
    { rgba: [35, 139, 69, alpha], break: 300 },
    { rgba: [0, 90, 50, alpha], break: 850 },
  ];

  return colorBreaks;
};
