import {logos} from '../logos';

it('test works', () => {
    expect(true).toBe(true);
})

it('registers SSPs', () => {
    let mySSPs = [
        {
            name: 'vancouver',
            data: 'data',
            register: jest.fn()
        },
        {
            name: 'apa',
            data: 'data',
            register: jest.fn()
        }
    ]
    logos.registerSSPs(mySSPs);
    expect(logos.SSPs).toMatchObject(
        {'vancouver': mySSPs[0]},
        {'apa': mySSPs[1]}
    )

    expect(mySSPs[0].register).toHaveBeenCalled();
    expect(mySSPs[1].register).toHaveBeenCalled();
});
