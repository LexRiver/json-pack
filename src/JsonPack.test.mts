import { expect, test } from 'vitest'
import { JsonPack } from "./JsonPack.mjs"

test.each([false, 0, '', null])('round-trips falsy top-level value %j', (original) => {
    expect(JsonPack.unpack(JsonPack.pack(original))).toBe(original)
})

test('preserves __proto__ as an own property without changing the prototype', () => {
    const original = JSON.parse('{"__proto__":{"polluted":true},"nested":{"__proto__":"value"}}')

    const unpacked = JsonPack.unpack(JsonPack.pack(original))

    expect(unpacked).toEqual(original)
    expect(Object.prototype.hasOwnProperty.call(unpacked, '__proto__')).toBe(true)
    expect(Object.getPrototypeOf(unpacked)).toBe(Object.prototype)
    expect(Object.prototype.hasOwnProperty.call(unpacked.nested, '__proto__')).toBe(true)
    expect(Object.getPrototypeOf(unpacked.nested)).toBe(Object.prototype)
    expect(({} as { polluted?: boolean }).polluted).toBeUndefined()
})

test('simple', () => {
    const original = [
        {firstName:'John', lastName:'Smith'},
        {firstName:'Anders', lastName: 'Hejlsberg'}
    ]
    const packedString = JsonPack.pack(original)
    console.log('packedString=', packedString) // JsonPack:{"keys":[["firstName","0"],["lastName","1"]],"data":[{"0":"John","1":"Smith"},{"0":"Anders","1":"Hejlsberg"}]}

    const unpacked = JsonPack.unpack(packedString)
    console.log('unpacked=', unpacked)

    expect(unpacked).toEqual(original)
})

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
    ]
    let packedString = JsonPack.pack(original)
    console.log('packedString=', packedString)

    const unpacked = JsonPack.unpack(packedString)

    console.log('unpacked=', JSON.stringify(unpacked, null, 4))

    expect(unpacked).toEqual(original)

})
