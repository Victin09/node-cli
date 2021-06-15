export interface Crud {
    list: (limit: number, page: number) => Promise<any>;
    create: (payload: any) => Promise<any>;
    putById: (id: number, resource: any) => Promise<string>;
    readById: (id: number) => Promise<any>;
    deleteById: (id: number) => Promise<string>;
    patchById: (id: number, resource: any) => Promise<string>;
}