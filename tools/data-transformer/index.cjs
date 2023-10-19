const fs = require('fs');
const fsp = require('fs/promises');

const fsp2File = require('./data/f_sp2.json');
const questionsFile = require('./data/questions.json');

const QUESTIONS_DICTIONARY = {
  0: 'address',
  1: 'width',
  2: 'category',
  3: 'abovegroundFloors',
  4: 'fireCompartmentFloorArea',
  5: 'height',
  6: 'volume',
  7: 'undergroundFloors',
  8: 'hasGroundFloor',
  9: 'groundFloorArea',
  10: 'totalSalesArea',
  11: 'isUndergroundSalesArea',
  12: 'salesArea',
  13: 'isDiningRoomInBasement',
  14: 'numberOfVisitors',
  15: 'hasSalesRoomWithoutNaturalLight',
};

const iife = async () => {
  const classificationToQuestions = fsp2File.reduce((acc, curr) => {
    const { f, questions } = curr;

    if (acc[f]) return acc;

    acc[f] = questions.split(',').map((q) => QUESTIONS_DICTIONARY[q - 1]);

    return acc;
  }, {});

  const questions = questionsFile.map((q) => {
    const { number, type, _id, ...rest } = q;
    return { id: QUESTIONS_DICTIONARY[number], type, ...rest };
  });

  const typesToClassification = fsp2File.map((i) => {
    const { name, normative, f } = i;

    return { name, f, normative };
  });

  if (!fs.existsSync('./processed')) fs.mkdirSync('./processed');

  await fsp.writeFile('./processed/classification-to-questions.json', JSON.stringify(classificationToQuestions));
  await fsp.writeFile('./processed/questions.json', JSON.stringify(questions));
  await fsp.writeFile('./processed/types-to-classification.json', JSON.stringify(typesToClassification));
};
iife();
