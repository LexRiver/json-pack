import { JsonPack } from "./JsonPack";
test('simple', () => {
    const original = [
        { firstName: 'John', lastName: 'Smith' },
        { firstName: 'Anders', lastName: 'Hejlsberg' }
    ];
    const packedString = JsonPack.pack(original);
    console.log('packedString=', packedString); // JsonPack:{"keys":[["firstName","0"],["lastName","1"]],"data":[{"0":"John","1":"Smith"},{"0":"Anders","1":"Hejlsberg"}]}
    const unpacked = JsonPack.unpack(packedString);
    console.log('unpacked=', unpacked);
    expect(unpacked).toEqual(original);
});
test('JsonPack', () => {
    const original = [
        { long: 1111, short: 22222 },
        { long: 2222, short: 33333 },
        {
            another: [
                { long: '3333', short: '5555' },
                { long: 'hh', short: 33434, hh: 'hohoho' }
            ]
        },
        {
            another: {
                another: {
                    long: '33333333333'
                }
            }
        }
    ];
    let packedString = JsonPack.pack(original);
    console.log('packedString=', packedString);
    const unpacked = JsonPack.unpack(packedString);
    console.log('unpacked=', JSON.stringify(unpacked, null, 4));
    expect(unpacked).toEqual(original);
});
