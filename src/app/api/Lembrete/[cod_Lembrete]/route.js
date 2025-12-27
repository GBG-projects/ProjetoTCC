import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req,{params}) {
    const {cod_Lembrete} = await params;

    try {
        const result = await pool.query('SELECT * FROM Lembrete WHERE cod_Lembrete = $1', [cod_Lembrete]);
        
        if (result.rows.length === 0) {
            return NextResponse.json({ message: "lembrete não encontrado" }, { status: 404 });
        }
        
        return NextResponse.json(result.rows[0], { status: 200 });
    }
    catch(error) {
        console.error("Erro ao buscar lembrete:", error);
        return new Response(
            JSON.stringify({
                message: "Erro ao buscar lembrete"}),
                {status: 500}

        )
    }
}