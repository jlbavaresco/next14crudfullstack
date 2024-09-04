import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getProdutoPorCodigoDB, updateProdutoDB } from '@/bd/produtoUseCases';

const ProdutoEditarPage = async ({ params }) => {
    const produto = await getProdutoPorCodigoDB(params.produtoCodigo);

    const updateProduto = async (formData) => {
        'use server';

        const objeto = {
            codigo: formData.get('codigo'),
            nome: formData.get('nome'), descricao: formData.get('descricao'),
            quantidade_estoque: formData.get('quantidade_estoque'),
            valor: formData.get('valor'), data_cadastro: formData.get('data_cadastro')
        }

        const retProd = await updateProdutoDB(objeto);

        console.log('retorno: ' + JSON.stringify(retProd));

        revalidatePath('/');
        redirect('/');
    };

    if (!produto) {
        return notFound();
    }

    return (
        <div>
            <h2>Produto</h2>
            <form action={updateProduto} >
                <input type="number" name="codigo" defaultValue={produto.codigo}
                    readOnly /><br />
                <input type="text" name="nome" placeholder="Nome"
                    defaultValue={produto.nome} /><br />
                <input type="text" name="descricao" placeholder="descricao"
                    defaultValue={produto.descricao} /><br />
                <input type="number" name="quantidade_estoque" placeholder="Estoque"
                    defaultValue={produto.quantidade_estoque} /><br />
                <input type="number" name="valor" placeholder="Valor"
                    defaultValue={produto.valor} /><br />
                <input type="date" name="data_cadastro" placeholder="Data Cadastro"
                    defaultValue={produto.data_cadastro} /><br />

                <button type="submit">Atualizar produto</button>
            </form>
        </div>
    )
};

export default ProdutoEditarPage;