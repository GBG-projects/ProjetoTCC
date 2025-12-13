const { NextResponse } = require("next/server");
import pool from "@/lib/db";


export async function POST(requisicao) {

    try {

        const {cod_Lembrete, Data_lembrete, titulo_lembrete, CodCompromisso } = await requisicao.json();

        if (!Data_lembrete || !titulo_lembrete ||!CodCompromisso) {
            return NextResponse.json(
                { error: "Informações em branco" },
                { status: 400 }
            );
        }

        
        await pool.query(
            `INSERT INTO Lembrete (Data_lembrete, titulo_lembrete, CodCompromisso)
            VALUES ($1, $2, $3)`,
            [Data_lembrete, titulo_lembrete, CodCompromisso]
        );

        return NextResponse.json({ message: "Lembrete criado" }, { status: 201 })

    } catch (error) {

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function GET() {

    try {

        const result = await pool.query(`SELECT * FROM Lembrete ORDER BY Lembrete asc;`);
        return NextResponse.json(result.rows);

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(requisicao) {

    try {
        const { searchParams } = new URL(requisicao.url);
        const id = searchParams.get("Cod_lembrete");

        if (!cod_Lembrete) {
            return NextResponse.json(
                { error: "Informe o codigo do lembrete para deletar." },
                { status: 400 }
            );
        }


        await pool.query(
            `DELETE FROM Lembrete WHERE Cod_lembrete = $1`,
            [cod_Lembrete]
        );

        return NextResponse.json({
            message: "Lembrete deletado com sucesso!"
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}