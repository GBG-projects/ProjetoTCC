const { NextResponse } = require("next/server");
import pool from "@/lib/db";


export async function POST(requisicao) {

    try {

        const { codcompromisso, descricao, titulo, Dt_inicial,Dt_final, status, CodCategoria, CodUsuario } = await requisicao.json();

        if (!descricao || !titulo ||!Dt_inicial || !Dt_final || !status || !CodCategoria || !CodUsuario) {
            return NextResponse.json(
                { error: "Informações em branco" },
                { status: 400 }
            );
        }

        
        await pool.query(
            `INSERT INTO compromisso (descricao, titulo, Dt_inicial,Dt_final, status, CodCategoria, CodUsuario)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [descricao, titulo, Dt_inicial,Dt_final, status, CodCategoria, CodUsuario]
        );

        return NextResponse.json({ message: "Compromisso criado" }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET() {

    try {

        const result = await pool.query(`SELECT * FROM compromisso ORDER BY codcompromisso asc;`);
        return NextResponse.json(result.rows);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(requisicao) {

    try {
        const { searchParams } = new URL(requisicao.url);
        const id = searchParams.get("codcompromisso");

        if (!id) {
            return NextResponse.json(
                { error: "Informe o codcompromisso para deletar." },
                { status: 400 }
            );
        }


        await pool.query(
            `DELETE FROM compromisso WHERE codcompromisso = $1`,
            [id]
        );

        return NextResponse.json({
            message: "compromisso deletado com sucesso!"
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}