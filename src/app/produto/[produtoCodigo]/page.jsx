import { notFound } from 'next/navigation';
import { getProdutoPorCodigoDB } from '@/bd/produtoUseCases';

const ProdutoPage = async ({ params }) => {
  const produto = await getProdutoPorCodigoDB(params.produtoCodigo);

  if (!produto) {
    return notFound();
  }

  return <h2>{produto.nome}</h2>;
};

export default ProdutoPage;