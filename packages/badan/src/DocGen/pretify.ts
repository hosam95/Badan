export const prettifyHeader = (header:string):{header:string,link:string}=>{
    header=header.replaceAll(/[-_]/g,' ')
    
    let index=header.search(/([^A-Z \n]{1}([A-Z]))|([^ \n]{1}([0-9]))/)
    while(index !=-1){
        header= header.slice(0,index+1)+" "+header.slice(index+1)
        index=header.search(/([^A-Z \n]{1}([A-Z]))|([^ \n]{1}([0-9]))/)
    }

    let link=header.toLowerCase().replaceAll(/ /g,'-');
    
    return {header:header,link:link}
}