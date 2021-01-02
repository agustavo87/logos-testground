

const routes = {
    index: jest.fn(() => 'users/2/sources'),
    store: jest.fn( x => true)
}

it('jest works', () => {
    expect(true).toBe(true);
})