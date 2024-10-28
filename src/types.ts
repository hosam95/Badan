export type Responder = (res:any)=>Respond

export type Respond = (status:number,response:any)=> void

export type Use = (...handlers:any[])=>void
