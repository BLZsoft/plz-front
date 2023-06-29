// TODO: @d.tankov — API Layer should be effector effects

export type Organization = {
  id: string;
  picture?: string;
  name: string;
};

const MOCK_DATA: Organization[] = [
  {
    id: 'personal',
    name: 'Личное пространство',
  },
  {
    id: '0',
    name: '"ООО" Пожбез',
  },
];

function fetchOrganizations(): Promise<Organization[]> {
  return new Promise((res) => {
    setTimeout(() => {
      res(MOCK_DATA);
    }, 2000);
  });
}

export const organizationsApi = {
  fetchOrganizations,
};
