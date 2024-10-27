type Respond = (status: number, response: any) => void;
type Use = (...handlers: any[]) => void;

declare abstract class BadanCoreSerializer {
    abstract responder(res: Response): Respond;
    abstract user(app: any): Use;
}

export { BadanCoreSerializer, type Respond, type Use };
