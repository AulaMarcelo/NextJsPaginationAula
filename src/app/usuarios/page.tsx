"use client"
import { getUsuarios } from "@/api/usuarios/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { UsuariosI } from "@/interfaces/usuario/interface";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";

function Usuarios() {
     const [skip, setSkipe] = useState(0)
     const [filter,setFilter] = useState('')
     const [search,setSearch] = useState('')
    const {data,isPending} = useQuery({
         queryKey: ['usuarios',skip,search], 
         queryFn: () =>getUsuarios(skip,search), 
    })
     if(isPending) {
        return <h1>Loading...</h1>
     }
    function handleFilter(event:React.ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        const value = event.target.value;
        setFilter(value)
    }

    return (
        <div className="p-10">
           <div className="flex w-2/3 ms-1 mb-4">
            <div className="relative w-full">
              <Input
               type="text"
               id="filter"
               value={filter}
               onChange={handleFilter}
              />
              <span className="absolute inset-y-1 right-0 pr-3"><Search  onClick={()=>setSearch(filter)} /></span>
            </div>
           </div>
        <Table>
        <TableCaption>Lista de Usuarios.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>Email</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((usuario:UsuariosI) =>(
                <TableRow>
                <TableCell className="font-medium">{usuario.nome}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                </TableRow>
            ))}
           
        </TableBody>
        </Table>
        <div className="flex items-center justify-center gap-6 mt-8">
            <Button 
            variant="outline"
            onClick={()=>setSkipe(old => Math.max(old-1,0))}
            >Anterior</Button>
            <p>Page:{skip}</p>
            <Button  
            variant="outline"
            onClick={()=>setSkipe(old => (data.length) > 0 ? old+1 : old)}
            >Proximo</Button>


        </div>
        </div>
      );
}

export default Usuarios;