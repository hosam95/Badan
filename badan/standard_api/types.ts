import { InputValidationQuery } from "./standard_api.js";
export class InputType{
    type:string='undefined'

    check(data:any):boolean{
        return false;
    }

    getType(){
        return this.type;
    }
}

export class InputOptions extends InputType{
    override type='multy input Options'
    private options:Array<InputType>

    constructor(options:Array<InputType>){
        super()
        this.options=options;
    }

    override check(data:any){
        for(let i=0;i<this.options.length;i++){
            if(this.options[i].check(data)){
                return true;
            }
        }
        return false;
    }
}

export class StringInput extends InputType{
    override type='string'

    override check(data:any){
        if(typeof data==='string'){
            return true;
        }
        return false;
    }
}

export class NumberInput extends InputType{
    override type='number'

    override check(data:any){ 
        if(typeof data==='number'){
            return true;
        }
        if(!isNaN(data)){
            return true;
        }
        return false;
    }
}

export class BoolInput extends InputType{
    override type='boolaen'

    override check(data:any){
        if(typeof data==='boolean'){
            return true;
        }
        if(typeof data==='string'){
            if(data.toLowerCase() == 'true'|| data.toLowerCase()=='false'){
                return true;
            }
        } 
        return false;
    }
}

export class AnyInput extends InputType{
    override type='any'

    override check(data:any){
        return true;
    }
}

export class InputGroub extends InputType{
    override type='multy required inputs'
    private inputs:Array<InputType>

    constructor(inputs:Array<InputType>){
        super()
        this.inputs=inputs;
    }

    override check(data:any){
        for(let i=0;i<this.inputs.length;i++){
            if(!this.inputs[i].check(data)){
                return false;
            }
        }
        return true;
    }
}

export class ComplexInput extends InputType{
    override type='complex'
    private inputs:InputValidationQuery[];

    constructor(input:InputValidationQuery[]){
        super()
        this.inputs=input;
    }

    override check(data:any){
        if(data==undefined){
            return false;
        }
        
        for(let i=0;i<this.inputs.length;i++){
            if(!this.inputs[i].type.check(data[this.inputs[i].name])){
                return false;
            }
        }
        return true;
    }

    private constructTestObject(){}
}

export class UnionInput extends InputType{
    override type='union'
    private inputs:any[];

    constructor(input:any[]){
        super()
        this.inputs=input;
    }

    override check(data:any){
        if(data==undefined){
            return false;
        }

        return this.inputs.includes(data);
    }
    override getType(): string {
        return `${this.type} of ${this.inputs}`
    }
}

export class ListInput extends InputType{
    override type='list'
    private inputs:InputType;

    constructor(input:InputType){
        super()
        this.inputs=input;
    }

    override check(data:any){
        if(!Array.isArray(data)){
            return false
        }

        for(let i=0;i<data.length;i++){
            if(!this.inputs.check(data[i])){
                return false;
            }
        }
        return true;
    }
}