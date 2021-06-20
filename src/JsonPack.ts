import { KeysMap } from "./KeysMap"

function isArray(x: any): boolean {
    return Array.isArray(x)
}


function isObject(o: any): boolean {
    //return o === Object(o) && Object.prototype.toString.call(o) !== '[object Array]'
    return o === Object(o) && Object.prototype.toString.call(o) === '[object Object]'
}

function isObjectWithKeys(o:any):boolean {
    return isObject(o) && Object.keys(o).length>0
}


export module JsonPack{

    const header:string = 'JsonPack:'

    export function pack(o:any){
        let keys = new KeysMap()
        let result = packAny(o, keys)
        return header+JSON.stringify({
            keys: keys.toArray(),
            data: result
        })
    }

    function packAny(o:any, keys:KeysMap){
        if(isArray(o)){
            return o.map(x => packAny(x, keys))

        } else if(isObjectWithKeys(o)){
            //return packObject(o, keys)
            let result = {}
            for(let key of Object.keys(o)){
                if(!keys.has(key)){
                    keys.add(key)
                }
                let newKey = keys.get(key)
                if(newKey !== undefined){
                    result[newKey] = packAny(o[key], keys)
                    
                }
            }
            return result
    
        }
        return o
    }

    export function unpack(packedString:string){
        if(typeof packedString !== 'string') throw new Error('not a string!')
        if(!packedString.startsWith(header)) throw new Error('not a pack! ')
        let jsonString = packedString.substr(header.length)
        let x = JSON.parse(jsonString)
        if(!x.keys) throw new Error('no keys!') 
        if(!x.data) throw new Error('no data!')
        
        // so x.keys is array of arrays
        let keyByCode = new Map<string,string>()
        for(let [k,v] of x.keys){
            keyByCode.set(v,k)
        }

        return unpackAny(x.data, keyByCode)
    }

    function unpackAny(o:any, keyByCode:Map<string,string>){
        if(isArray(o)){
            return o.map(x => unpackAny(x, keyByCode))

        } else if(isObjectWithKeys(o)){
            let result = {}
            for(let key of Object.keys(o)){
                let newKey = keyByCode.get(key)
                if(newKey !== undefined){
                    result[newKey] = unpackAny(o[key], keyByCode)
                }
            }
            return result

        }
        return o
    }


}

