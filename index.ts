// Model
class BaseModel {
    constructor(public id: number, public name?: string, public created_at?: string) { }
}

class Product extends BaseModel {
    constructor(id: number, public categoryid?: number, public category?: Category, name?: string, created_at?: string) {
        super(id, name, created_at);
    }

    setCategory(category: Category) {
        this.category = category;
        this.categoryid = category.id;
    }
}

class Category extends BaseModel {
    constructor(id: number, public products: Product[] = [], name?: string, created_at?: string) {
        super(id, name, created_at);
    }

    addProduct(product: Product) {
        this.products.push(product);
        product.setCategory(this);
    }
}

// Repository (Model Layer)
interface IRepository<T> {
    getAll(): T[];
    create(item: T): T;
    getById(id: number): T | undefined;
    update(item: T, id: number): T;
    erase(id: number): void;
}

abstract class Repository<T extends BaseModel> implements IRepository<T> {
    protected model: T[] = [];

    getAll(): T[] {
        return this.model;
    }

    getById(id: number): T | undefined {
        return this.model.find(item => item.id === id);
    }

    create(item: T): T {
        this.model.push(item);
        return item;
    }

    update(item: T, id: number): T {
        const index = this.model.findIndex(i => i.id === id);
        if (index > -1) {
            this.model[index] = item;
        }
        return item;
    }

    erase(id: number): void {
        const index = this.model.findIndex(i => i.id === id);
        if (index > -1) {
            this.model.splice(index, 1);
        }
    }
}

class ProductRepository extends Repository<Product> {
    getProductInStock(): Product[] {
        // Filtro fictício para produtos em estoque
        return this.model.filter(product => product.id > 0);
    }
}

class CategoryRepository extends Repository<Category> { }

// Controller
class BaseController<T extends BaseModel> {
    constructor(protected repository: Repository<T>) { }

    getAll(): T[] {
        return this.repository.getAll();
    }

    getById(id: number): T | undefined {
        return this.repository.getById(id);
    }

    create(id: number, name: string): T {
        const item = this.createInstance(id, name);
        return this.repository.create(item);
    }

    update(id: number, name: string): T {
        const item = this.createInstance(id, name);
        return this.repository.update(item, id);
    }

    erase(id: number): void {
        this.repository.erase(id);
    }

    protected createInstance(id: number, name: string): T {
        throw new Error('Method not implemented.');
    }
}

class ProductController extends BaseController<Product> {
    protected createInstance(id: number, name: string): Product {
        return new Product(id, undefined, undefined, name);
    }
}

class CategoryController extends BaseController<Category> {
    protected createInstance(id: number, name: string): Category {
        return new Category(id, [], name);
    }
}

// View
class BaseView<T extends BaseModel> {
    display(items: T[], title: string): void {
        console.log(`*** ${title} ***`);
        items.forEach(item => console.log(`ID: ${item.id}, Name: ${item.name}`));
    }
}

class ProductView extends BaseView<Product> { }

class CategoryView extends BaseView<Category> { }

// Injeção de Dependências e Uso
const productRepository = new ProductRepository();
const productController = new ProductController(productRepository);
const productView = new ProductView();

const newProd = productController.create(1, 'product1');
const allProds = productController.getAll();
productView.display(allProds, 'Products');

const categoryRepository = new CategoryRepository();
const categoryController = new CategoryController(categoryRepository);
const categoryView = new CategoryView();

const newCat = categoryController.create(1, 'category1');
const allCats = categoryController.getAll();
categoryView.display(allCats, 'Categories');

// Adicionando um produto a uma categoria
newCat.addProduct(newProd);
