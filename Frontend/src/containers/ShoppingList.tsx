import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Product = {
  name: string;
  price: number;
};

const ShoppingList = () => {
  const [product, setProduct] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentProductIndex, setCurrentProductIndex] = useState<number | null>(
    null
  );

  const handleAddProduct = () => {
    const newProduct: Product = { name: product, price };
    setProducts([...products, newProduct]);
    setProduct('');
    setPrice(0);
  };

  const handleEditProduct = (index: number) => {
    setIsEditing(true);
    setCurrentProductIndex(index);
    setProduct(products[index].name);
    setPrice(products[index].price);
  };

  const handleUpdateProduct = () => {
    const updatedProducts = [...products];
    updatedProducts[currentProductIndex as number] = {
      name: product,
      price,
    };
    setProducts(updatedProducts);
    setIsEditing(false);
    setProduct('');
    setPrice(0);
    setCurrentProductIndex(null);
  };

  const handleDeleteProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <TextField
        label="Product Name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <TextField
        label="Product Price"
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
        type="number"
      />
      {!isEditing ? (
        <Button variant="contained" onClick={handleAddProduct}>
          Add Product
        </Button>
      ) : (
        <Button variant="contained" onClick={handleUpdateProduct}>
          Update Product
        </Button>
      )}
      <List>
        {products.map((product, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={product.name}
              secondary={`Price: ${product.price}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditProduct(index)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteProduct(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ShoppingList;
