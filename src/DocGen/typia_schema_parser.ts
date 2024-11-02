export function schema_to_json(objct:any):string{
    return parser_switch(objct,1);
}

function parser_switch(objct:any,level:number):string{
    if(objct.oneOf){
        /**@todo:parse as union */
        return parse_union(objct,level);
    }

    switch (objct.type){
        case 'array':
            return parse_array(objct,level);
            break;
        case 'object':
            return parse_object(objct,level) 
            break;
        default:
            if(objct.enum){
                return JSON.stringify(objct.enum[0])
            }
            return objct.type;
    }
}

function parse_union(objct:any,level:number){
    let json=''
    for (let i=0;i<objct.oneOf.length;i++){
        json += ((i == 0)? '':' | ' )+ parser_switch(objct.oneOf[i],level+1)
    }
    return json;
}

function parse_array(objct:any,level:number){
    return `Array<${parser_switch(objct.items,level+1)}>`
}

function parse_object(objct:any,level:number):string{
    let json='{';

    if(objct.type !== 'object'){
        throw(Error("parse_object received non-object parameter"))
    }
    

    for( const [key , value] of Object.entries(objct.properties) ){
        json += '\n' + get_tabs(level) + key + ((objct.required.includes(key))? '':'!') + ':' + parser_switch(value,level+1)
    }

    return json +'\n' +get_tabs(level-1) + '}';
}

function get_tabs (level:number):string{
    let str =''
    for(;level!==0;level--){
        str += '\t'
    }
    return str;
}
