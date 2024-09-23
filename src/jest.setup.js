jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: {} })),
  }));
  