import { iJSON } from "../utils/functions";

let okJSON = '{"prop1":"value", "prop2":34}';
let wrongJSON = '{"prop1:"value", "prop2":34}';

describe('improved JSON parsing interface', () => {
    it('parses json correctly', () => {
        let ijson = iJSON(okJSON);
        expect(ijson.errored).toBeFalsy();
        expect(ijson.get).toBeInstanceOf(Object);
    });
    
    it('detects json error', () => {
        let ijson = iJSON(wrongJSON);
        expect(ijson.get).toBeNull();
        expect(ijson.errored).toBeTruthy();
        expect(ijson.error).toBeInstanceOf(SyntaxError);
    })
})

