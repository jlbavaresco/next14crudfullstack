
import { getProdutosDB, addProdutoDB, deleteProdutoDB } from "@/bd/produtoUseCases";
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

export const revalidate = 60; // revalida a cada 30 segundos

const createProduto = async (formData) => {
  'use server';

  const objeto = {
    nome: formData.get('nome'), descricao: formData.get('descricao'),
    quantidade_estoque: formData.get('quantidade_estoque'),
    valor: formData.get('valor'), data_cadastro: formData.get('data_cadastro')
  }

  const retProd = await addProdutoDB(objeto);

  console.log('retorno: ' + JSON.stringify(retProd));

  revalidatePath('/');
};

const deleteProduto = async (codigo) => {
  'use server';

  await deleteProdutoDB(codigo);
  revalidatePath('/');
};

export default async function Home() {

  const produtos = await getProdutosDB();
  return (
    <div>
      <h2>Produtos</h2>
      <form action={createProduto} >
        <input type="text" name="nome" placeholder="Nome" /><br />
        <input type="text" name="descricao" placeholder="descricao" /><br />
        <input type="number" name="quantidade_estoque" placeholder="Estoque" /><br />
        <input type="number" name="valor" placeholder="Valor" /><br />
        <input type="date" name="data_cadastro" placeholder="Data Cadastro" /><br />

        <button type="submit">Criar produto</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Estoque</th>
            <th>Data Cadastro</th>
            <th>Detalhes</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            produtos.map((produto) => (
              <tr key={produto.codigo}>
                <td>{produto.codigo}</td>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{produto.valor}</td>
                <td>{produto.quantidade_estoque}</td>
                <td>{produto.data_cadastro}</td>
                <td><Link href={`/produto/${produto.codigo}`}> Detalhes </Link></td>
                <td><Link href={`/produto/${produto.codigo}/editar`}> Editar </Link></td>
                <td>
                  <form action={deleteProduto.bind(null, produto.codigo)}>
                    <button type="submit">Excluir</button>
                  </form></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
