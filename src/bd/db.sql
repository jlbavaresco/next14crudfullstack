create table produtos (
   codigo serial not null primary key, 
   nome varchar (50) not null,
   descricao text, 
   quantidade_estoque integer,
   check (quantidade_estoque >= 0),
   valor numeric(12,2) not null, 
   data_cadastro date not null
);

insert into produtos (nome, descricao, quantidade_estoque, valor, data_cadastro)
values ('Mouse USB','Mouse USB', 20, 60.0, current_date), 
('Mouse Sem FIO','Mouse sem fio', 10, 120.0, current_date),
('Teclado USB','Teclado USB', 30,  500.0, current_date);