const { NextResponse } = require("next/server");
import pool from "@/lib/db";


export async function POST(requisicao) {

    try {

        const { CodCategoria, Nome, Descricao } = await requisicao.json();

        if (!Nome || !Descricao) {
            return NextResponse.json(
                { error: "Nome e Email obrigatórios." },
                { status: 400 }
            );
        }

        await pool.query(
            `INSERT INTO clientes (nome, Descricao)
            VALUES ($1, $2)`,
            [Nome, Descricao]
        );

        return NextResponse.json({ message: "Categoria inserida com sucesso" }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET() {

    try {

        const result = await pool.query(`SELECT * FROM Categoria ORDER BY CodCategoria;`);
        return NextResponse.json(result.rows);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(requisicao) {

    try {
        const { searchParams } = new URL(requisicao.url);
        const id = searchParams.get("CodCategoria");

        if (!CodCategoria) {
            return NextResponse.json(
                { error: "Informe o CodCategoria para deletar." },
                { status: 400 }
            );
        }

        await pool.query(
            `DELETE FROM Categoria WHERE CodCategoria = $1`,
            [CodCategoria]
        );

        return NextResponse.json({
            message: "Categoria deletada com sucesso!"
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}