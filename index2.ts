const db = {
    "products": [
        { "id": 1, "name": "product1", "categoryId": 2 },
        { "id": 2, "name": "product2", "categoryId": 1 },
        { "id": 3, "name": "product3", "categoryId": 2 },
        { "id": 4, "name": "product4", "categoryId": 1 }
    ],
    "categories": [
        { "id": 1, "name": "category1" },
        { "id": 2, "name": "category2" }
    ]    
}

class Product {
    constructor(public id: number, public name: string, public categoryId: number) { }
}

class Category {
    constructor(public id: number, public name: string) { }
}

interface IRepository<T>{
    getAll(): T[] 
}

abstract class BaseRepository<T> implements IRepository<T>{

   constructor(public data: T[]) { }

    getAll(): T[] {
        return this.data;
    }

    getById(id: number): T | undefined {
        return this.data.find(item => (item as any).id === id);
    }
}

class ProductRepository extends BaseRepository<Product> {
    constructor() {
       super(db.products.map(p => new Product(p.id, p.name, p.categoryId)));
    }
}

class CategoryRepository extends BaseRepository<Category> {
    constructor() {
        super(db.categories.map(c => new Category(c.id, c.name)));
    }
}

let productRepository = new ProductRepository();
console.log(productRepository.getAll())

let categoryRepository = new CategoryRepository();
console.log(categoryRepository.getAll())
