const { NextResponse } = require("next/server");
import pool from "@/lib/db";


export async function POST(requisicao) {

    try {

        const { CodUsuario, CodCompromisso, FuncaoNaTurma, Nivel_participacao} = await requisicao.json();

        if (!FuncaoNaTurma || !Nivel_participacao) {
            return NextResponse.json(
                { error: "Informações em branco" },
                { status: 400 }
            );
        }

        
        await pool.query(
            `INSERT INTO Turma (FuncaoNaTurma, Nivel_participacao)
            VALUES ($1, $2)`,
            [FuncaoNaTurma, Nivel_participacao]
        );

        return NextResponse.json({ message: "Turma criada" }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET() {

    try {

        const result = await pool.query(`SELECT * FROM Turma ORDER BY CodUsuario, CodCompromisso asc;`);
        return NextResponse.json(result.rows);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(requisicao) {

    try {
        const { searchParams } = new URL(requisicao.url);
        const CodUsuario = searchParams.get("CodUsuario");
        const CodCompromisso = searchParams.get("CodUsuario");
        if (!CodUsuario || !CodCompromisso) {
            return NextResponse.json(
                { error: "Informe o Codigo do usuario e o codigo do Compromisso para deletar." },
                { status: 400 }
            );
        }


        await pool.query(
            `DELETE FROM Turma WHERE CodUsuario = $1 and CodCompromisso = $2`,
            [CodUsuario, CodCompromisso]
        );

        return NextResponse.json({
            message: "turma deletada com sucesso!"
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}