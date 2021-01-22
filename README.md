# json-pack

Pack json object or array to string by recursively compressing keys only.

## Install

`npm install @lexriver/json-pack`

## Import

```typescript
import {JsonPack} from '@lexriver/json-pack'
```

## Usage

```typescript

    const original = [
        {firstName:'John', lastName:'Smith'},
        {firstName:'Anders', lastName: 'Hejlsberg'}
    ]
    const packedString = JsonPack.pack(original)
    console.log('packedString=', packedString) // JsonPack:{"keys":[["firstName","0"],["lastName","1"]],"data":[{"0":"John","1":"Smith"},{"0":"Anders","1":"Hejlsberg"}]}

    const unpacked = JsonPack.unpack(packedString)
    console.log('unpacked=', unpacked)

```
<br/>

## Methods

### JsonPack.pack(o):string

Pack json object to string. The only argument `o` must be of type `Object` or `Array`.
Only same keys for object are compressed, not the values.

Returns string.


<br/>


### JsonPack.unpack(packedString:string)

Unpack string to object or array.

<br/>

