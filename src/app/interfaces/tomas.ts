export interface Tomas {

    id?: number;
    cveusu: string;
    alias: string;

}

export interface MasTomas{
    id?: number;
    alias: string;
    cveusu: string;
    direccion: string;
    estatusContrato: string;
    mesesAdeudo: string;
    saldo:number;
    nombre: string;
}

export interface Login{
    email: string;
    password: string;
}

export interface ResponseI{
    status: string;
    token: any;
}