import { Product } from './product.model';

export interface CreateProductDto extends Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'category'>{
  categoryId: string;
}

type example = Pick<Product, 'color' | 'description'>;

export interface updateProductDto extends Partial<CreateProductDto>{}

type example2 = Required<Product>; // quiere  todos los datos

export interface FindProductDto extends Readonly<Partial<Omit<Product, 'tags'>>>{
  readonly tags: ReadonlyArray<string>;
}

type example3 = Readonly<Product>;
