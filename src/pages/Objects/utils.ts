// @ts-nocheck
const extractDataFromStr = (sp2Data: string): Array<string> => {
  const data = sp2Data.trim();
  let result: Array<string | null> = [];

  if (data && data.length) {
    result = data.split('.');
  }

  return result;
};
export const getSP2Floors = (data: string) => extractDataFromStr(data)[1];
export const getSP2Areas = (data: string) => extractDataFromStr(data)[2];
export const getSP2Height = (data: string) => extractDataFromStr(data)[3];
export const getSP2F = (data: string) => extractDataFromStr(data)[0]?.replace(',', '.');
export const makeSP2Object = ({ name, fields }) => {
  const [f, floor, area, height] = extractDataFromStr(name);

  return {
    name,
    f,
    floor,
    area,
    height,
    ...fields,
  };
};
export const getDataByType = (data, type) => {
  console.log(type);
  const dataByType = data.filter((item) => type === getSP2F(item?.name));

  return dataByType;
};
export const getFloorsByType = (data) =>
  data.reduce((acc, item) => {
    const result = getSP2Floors(item?.name);

    if (result && !acc.includes(result)) {
      acc.push(result);
    }
    return acc;
  }, []);

export const getAreasByTypeAndFloor = (data, floor = 1) =>
  data
    .filter((item) => {
      const checkMask = `${getSP2F(item?.name)?.replace('.', ',')}.${floor}`;

      return item?.name?.includes(checkMask);
    })
    .map((item) => getSP2Areas(item?.name));

export const getHeightByTypeAndFloor = (data, floor = 1, area) =>
  data
    .filter((item) => {
      const checkMask = `${getSP2F(item?.name)?.replace('.', ',')}.${floor}.${area}`;

      return item?.name?.includes(checkMask);
    })
    .map((item) => getSP2Height(item?.name));

export const getClassAndDegree = (data, f, floor, area, height) => {
  const checkMask = `${f?.replace('.', ',')}.${floor}.${area}.${height}`;
  const obj = data.find((item) => item?.name === checkMask);

  return [obj?.fields?.class, obj?.fields?.type, obj?.fields?.category];
};
