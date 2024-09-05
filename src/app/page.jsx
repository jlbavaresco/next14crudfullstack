
import { getProdutosDB, addProdutoDB, deleteProdutoDB } from "@/bd/produtoUseCases";
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const revalidate = 60; // revalida a cada 30 segundos

const createProduto = async (formData) => {
  'use server';

  const objeto = {
    nome: formData.get('nome'), descricao: formData.get('descricao'),
    quantidade_estoque: formData.get('quantidade_estoque'),
    valor: formData.get('valor'), data_cadastro: formData.get('data_cadastro')
  }
  let error = "";
  try {
    const retProd = await addProdutoDB(objeto);

  } catch (err) {
    error = 'Erro: ' + err;
  }

  if (error.length > 0) {
    redirect(`/?message=${error}`);
  } else {
    revalidatePath('/');
    redirect('/');
  }
};

const deleteProduto = async (codigo) => {
  'use server';
  let error = "";
  try {
    await deleteProdutoDB(codigo);

  } catch (err) {
    error = 'Erro: ' + err;
  }

  if (error.length > 0) {
    redirect(`/?message=${error}`);
  } else {
    revalidatePath('/');
    redirect('/');
  }
};

export default async function Home({ searchParams }) {
  const message = searchParams?.message || null;
  const produtos = await getProdutosDB();
  return (
    <div>
      <h2>Produtos</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
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
