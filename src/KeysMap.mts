/**
 * Store string keys and their short codes
 */
export class KeysMap{
    protected codeByKey = new Map<string, string>()

    protected nextIndex:number = 0

    public has(key:string):boolean{
        return this.codeByKey.has(key)
    }

    public add(key:string){
        if(this.has(key)) throw new Error('already have key '+key)
        this.codeByKey.set(key, this.nextIndex.toString(36))
        this.nextIndex++
    }

    public get(key:string):string|undefined{
        return this.codeByKey.get(key)
    }

    public toJsonString(){
        return JSON.stringify([...this.codeByKey])
    }

    public toArray(){
        return [...this.codeByKey]
    }

}
