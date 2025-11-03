import { Estoque } from "./estoque.model";

export class Jogo {
id?:number|null;
titulo?:string|null;
genero?:string|null;
PrecoUnit?:number|null;
jogoSaga?:number|null;
jogoClassificacao?:number|null;
jogoEstoque?:number|null;
jogoMidia?:number|null;
jogoPlataforma?: number[]|null;
}
