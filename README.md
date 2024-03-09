# node_typescript_mvc_skeleton
Um esqueleto para ser usado como base em implementações em projetos node js dentro do padrão de projetos MVC e orientação a objetos. Esse código pode ser usado para iniciar projetos dentro dessa arquitetura.

## estrutura de pastas (sugestão):
src/
|-- |-- models/
|   |--|-- baseModel.ts
|   |--|-- product.ts (class Product extends class BaseModel)
|   |--|-- category.ts (class Category extends class BaseModel)
|
|-- |-- models/repositories/
|   |--|--|-- irepository.ts (interface)
|   |--|--|-- repository.ts  (abstract class Repository implements interface IRepository)
|   |--|--|-- productRepository.ts (class productRepository extends abstrac class Repository)
|   |--|--|-- categoryRepository.ts (class CategoryRepository extends abstrac class Repository)
|
|-- |-- controllers/
|   |--|-- baseController.ts
|   |--|-- productController.ts (class ProductController extends class BaseController)
|   |--|-- categoryController.ts (class CategoryController extends class BaseController)
|
|-- |-- views/
|   |--|-- baseView.ts
|   |--|-- productView.ts (class ProductView extends class baseView)
|   |--|-- categoryView.ts (class CategoryView extends class baseView)
|
/ (root)
index.ts (ou main.ts, pu app.ts - onde a aplicação é inicializada)

## padrão mvc

[Model] <-----> [Repository] <-----> [Controller] <-----> [View]

- Model: Define a estrutura de dados (Product, Category).
- Repository: Abstrai a lógica de acesso aos dados (Repository, ProductRepository, CategoryRepository).
- Controller: Contém a lógica de negócios e interage com o repositório para manipular os dados (ProductController, CategoryController).
- View: Apresenta os dados ao usuário (ProductView, CategoryView).
