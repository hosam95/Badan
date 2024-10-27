export type Respond = (status:number,response:any)=> void

export type Use = (...handlers:any[])=>void