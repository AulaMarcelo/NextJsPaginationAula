import { baseUrl, takeUsuarios } from "@/config/variables";

async function getUsuarios(skip:number,filter:string){
    const url = `${baseUrl}/user/take/${takeUsuarios}/skip/${skip}/${filter}`;
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'accept': 'application/json'
        },
    })

    if(!response.ok){
        throw new Error("Erro na conexção")
    }
  
    const usuarios = await response.json();
    return usuarios;
}

export {getUsuarios}