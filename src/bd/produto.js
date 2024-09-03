class Produto {
    constructor(codigo, nome, descricao, quantidade_estoque,  valor, data_cadastro) {
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.quantidade_estoque = quantidade_estoque;        
        this.valor = valor;
        this.data_cadastro = data_cadastro;
    }
}

module.exports = Produto;