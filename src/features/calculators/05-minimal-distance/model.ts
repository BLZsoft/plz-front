import { createEvent, createStore, sample } from 'effector';
import { spread } from 'patronum';

import { type Object } from '~/shared/api/objects';
import { HazardClass, ResistanceLevel } from '~/shared/types';

export const $neighborBuildingHazardClass = createStore<HazardClass | null>(null);
export const neighborBuildingHazardClassChanged = createEvent<HazardClass>();

sample({
  clock: neighborBuildingHazardClassChanged,
  target: $neighborBuildingHazardClass,
});

export const $neighborBuildingResistanceLevel = createStore<ResistanceLevel | null>(null);

export const neighborBuildingResistanceLevelChanged = createEvent<ResistanceLevel>();

sample({
  clock: neighborBuildingResistanceLevelChanged,
  target: $neighborBuildingResistanceLevel,
});

export const $object = createStore<Object | null>(null);

export const objectChanged = createEvent<Object>();

sample({
  clock: objectChanged,
  target: $object,
});

export const DISTANCE_NOT_NORMATIVE = -1;

export const $resultDistance = createStore<number | null>(null);

export const $errorMessage = createStore<string | null>(null);

const OBJECT_PARAMETERS_NULL_ERROR = {
  value: null,
  error: 'Ошибка! Отсутствуют параметры у рассчитываемого объекта.',
};

const OBJECT_PARAMETERS_ERROR = {
  value: null,
  error:
    'Ошибка! Объект с такой степенью огнестойкости и классом конструктивной пожарной опасности невозможно рассчитать.',
};

const NEIGHBOR_OBJECT_PARAMETERS_ERROR = {
  value: null,
  error:
    'Ошибка! Соседний объект с такой степенью огнестойкости и классом конструктивной пожарной опасности невозможно рассчитать.',
};

sample({
  source: {
    neighborResistanceLevel: $neighborBuildingResistanceLevel,
    neighborHazardClass: $neighborBuildingHazardClass,
    object: $object,
  },
  filter: ({ neighborResistanceLevel, neighborHazardClass, object }) =>
    Boolean(neighborResistanceLevel && neighborHazardClass && object),
  fn: ({ neighborResistanceLevel, neighborHazardClass, object }) => {
    if (!neighborResistanceLevel || !neighborHazardClass || !object) return { value: null, error: null };

    if (!object.hazard_class || !object.resistance_level) return OBJECT_PARAMETERS_NULL_ERROR;

    // Ф1, Ф2, Ф3, Ф4
    if (object.f[0] !== '5') {
      // Проверка введённых пользователем данных
      if (neighborHazardClass === HazardClass.C0) {
        if (
          neighborResistanceLevel !== ResistanceLevel.I &&
          neighborResistanceLevel !== ResistanceLevel.II &&
          neighborResistanceLevel !== ResistanceLevel.III
        )
          return NEIGHBOR_OBJECT_PARAMETERS_ERROR;
      }
      if (neighborHazardClass === HazardClass.C1) {
        if (
          neighborResistanceLevel !== ResistanceLevel.I &&
          neighborResistanceLevel !== ResistanceLevel.III &&
          neighborResistanceLevel !== ResistanceLevel.IV
        )
          return NEIGHBOR_OBJECT_PARAMETERS_ERROR;
      }
      if (neighborHazardClass === HazardClass.C2 || neighborHazardClass === HazardClass.C3) {
        if (neighborResistanceLevel !== ResistanceLevel.V) return NEIGHBOR_OBJECT_PARAMETERS_ERROR;
      }

      // Рассчет результата для выбранного объекта
      // CO I/II/III
      if (object.hazard_class[0] === HazardClass.C0) {
        if (
          object.resistance_level[0] === ResistanceLevel.I ||
          object.resistance_level[0] === ResistanceLevel.II ||
          object.resistance_level[0] === ResistanceLevel.III
        ) {
          if (neighborHazardClass === HazardClass.C0) return { value: 6, error: null };
          if (neighborHazardClass === HazardClass.C1) return { value: 8, error: null };
          return { value: 10, error: null };
        }

        return OBJECT_PARAMETERS_ERROR;
      }
      // C1 II/III/IV
      if (object.hazard_class[0] === HazardClass.C1) {
        if (
          object.resistance_level[0] === ResistanceLevel.II ||
          object.resistance_level[0] === ResistanceLevel.III ||
          object.resistance_level[0] === ResistanceLevel.IV
        ) {
          if (neighborHazardClass === HazardClass.C0) return { value: 8, error: null };
          if (neighborHazardClass === HazardClass.C1) return { value: 10, error: null };
          return { value: 12, error: null };
        }

        return OBJECT_PARAMETERS_ERROR;
      }
      // C2/C3 IV/V
      if (object.resistance_level[0] === ResistanceLevel.IV || object.resistance_level[0] === ResistanceLevel.V) {
        if (neighborHazardClass === HazardClass.C0) return { value: 10, error: null };
        if (neighborHazardClass === HazardClass.C1) return { value: 12, error: null };
        return { value: 15, error: null };
      }

      return OBJECT_PARAMETERS_ERROR;
    }
    // Ф5
    // Проверка введённых пользователем данных
    // C0 — любой (I, II, III, IV в первом столбце. V — в последнем). Не проверяем

    // C1 — III, IV, V
    // C2 — III, IV, V
    // C3 — III, IV, V
    if (
      neighborHazardClass === HazardClass.C1 ||
      neighborHazardClass === HazardClass.C2 ||
      neighborHazardClass === HazardClass.C3
    ) {
      if (
        neighborResistanceLevel !== ResistanceLevel.III &&
        neighborResistanceLevel !== ResistanceLevel.IV &&
        neighborResistanceLevel !== ResistanceLevel.V
      )
        return NEIGHBOR_OBJECT_PARAMETERS_ERROR;
    }

    // Рассчет результата для выбранного объекта
    // Третья строка
    if (
      // Resistance Level === V
      object.resistance_level[0] === ResistanceLevel.V ||
      // Или IV для C1, C2, C3
      (object.resistance_level[0] === ResistanceLevel.IV &&
        (object.hazard_class[0] === HazardClass.C1 ||
          object.hazard_class[0] === HazardClass.C2 ||
          object.hazard_class[0] === HazardClass.C3)) ||
      // Или III для C2, C3
      (object.resistance_level[0] === ResistanceLevel.III &&
        (object.hazard_class[0] === HazardClass.C2 || object.hazard_class[0] === HazardClass.C3))
    ) {
      // Третий столбец
      if (
        // У соседа Resistance Level === V
        neighborResistanceLevel === ResistanceLevel.V ||
        // Или IV для C1, C2, C3
        (neighborResistanceLevel === ResistanceLevel.IV &&
          (neighborHazardClass === HazardClass.C1 ||
            neighborHazardClass === HazardClass.C2 ||
            neighborHazardClass === HazardClass.C3)) ||
        // Или III для C2, C3
        (neighborResistanceLevel === ResistanceLevel.III &&
          (neighborHazardClass === HazardClass.C2 || neighborHazardClass === HazardClass.C3))
      )
        return { value: 18, error: null };

      // Второй столбец
      if (
        // У соседа Resistance Level === III && Hazard class === C1
        neighborResistanceLevel === ResistanceLevel.III &&
        neighborHazardClass === HazardClass.C3
      )
        return { value: 15, error: null };

      // Первый столбец
      return { value: 12, error: null };
    }
    // Вторая строка
    if (object.resistance_level[0] === ResistanceLevel.III && object.hazard_class[0] === HazardClass.C3) {
      // Третий столбец
      if (
        // У соседа Resistance Level === V
        neighborResistanceLevel === ResistanceLevel.V ||
        // Или IV для C1, C2, C3
        (neighborResistanceLevel === ResistanceLevel.IV &&
          (neighborHazardClass === HazardClass.C1 ||
            neighborHazardClass === HazardClass.C2 ||
            neighborHazardClass === HazardClass.C3)) ||
        // Или III для C2, C3
        (neighborResistanceLevel === ResistanceLevel.III &&
          (neighborHazardClass === HazardClass.C2 || neighborHazardClass === HazardClass.C3))
      )
        return { value: 15, error: null };

      // Второй столбец
      if (
        // У соседа Resistance Level === III && Hazard class === C1
        neighborResistanceLevel === ResistanceLevel.III &&
        neighborHazardClass === HazardClass.C3
      )
        return { value: 12, error: null };

      return { value: 9, error: null };
    }

    // Первая строка
    // Третий столбец
    if (
      // У соседа Resistance Level === V
      neighborResistanceLevel === ResistanceLevel.V ||
      // Или IV для C1, C2, C3
      (neighborResistanceLevel === ResistanceLevel.IV &&
        (neighborHazardClass === HazardClass.C1 ||
          neighborHazardClass === HazardClass.C2 ||
          neighborHazardClass === HazardClass.C3)) ||
      // Или III для C2, C3
      (neighborResistanceLevel === ResistanceLevel.III &&
        (neighborHazardClass === HazardClass.C2 || neighborHazardClass === HazardClass.C3))
    )
      return { value: 12, error: null };

    // Второй столбец
    if (
      // У соседа Resistance Level === III && Hazard class === C1
      neighborResistanceLevel === ResistanceLevel.III &&
      neighborHazardClass === HazardClass.C3
    )
      return { value: 9, error: null };

    if (object.category === 'Г' || object.category === 'Д') return { value: DISTANCE_NOT_NORMATIVE, error: null };

    return { value: 9, error: null };
  },
  target: spread({
    targets: {
      value: $resultDistance,
      error: $errorMessage,
    },
  }),
});

export const calculator05MinimalDistanceModel = {
  $neighborBuildingHazardClass,
  $neighborBuildingResistanceLevel,
  $object,
  $resultDistance,
  $errorMessage,
  '@@unitShape': () => ({
    neighborBuildingHazardClass: $neighborBuildingHazardClass,
    onNeighborBuildingHazardClassChange: neighborBuildingHazardClassChanged,
    neighborBuildingResistanceLevel: $neighborBuildingResistanceLevel,
    onNeighborBuildingResistanceLevelChange: neighborBuildingResistanceLevelChanged,
    onObjectChanged: objectChanged,
    error: $errorMessage,
    result: $resultDistance,
  }),
};
