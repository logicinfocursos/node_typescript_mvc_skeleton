# node_typescript_mvc_skeleton
Um esqueleto para ser usado como base em implementações em projetos node js dentro do padrão de projetos MVC e orientação a objetos. Esse código pode ser usado para iniciar projetos dentro dessa arquitetura.

## padrão mvc

[Model] <-----> [Repository] <-----> [Controller] <-----> [View]

- Model: Define a estrutura de dados (Product, Category).
- Repository: Abstrai a lógica de acesso aos dados (Repository, ProductRepository, CategoryRepository).
- Controller: Contém a lógica de negócios e interage com o repositório para manipular os dados (ProductController, CategoryController).
- View: Apresenta os dados ao usuário (ProductView, CategoryView).
