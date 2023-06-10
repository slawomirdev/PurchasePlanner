import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Skeleton,
  Box,
  Grid,
  Card,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import api from '../Api/api';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Item {
  id: number;
  item_name: string;
  item_price: number;
  date_added: string;
}

const ShoppingList: React.FC = () => {
  const { id: listId } = useParams();
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [listName, setListName] = useState('');
  console.log(items);
  useEffect(() => {
    api
      .get('/lists/' + listId + '/items')
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [listId]);

  useEffect(() => {
    api
      .get('/lists/single/' + listId)
      .then((response) => {
        setListName(response.data.name);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, [listId]);

  const handleAddItem = () => {
    setLoading(true);
    api
      .post('/lists/' + listId + '/items', {
        item_name: newItemName,
        item_price: parseFloat(newItemPrice),
        date_added: new Date(),
      })
      .then((response) => {
        setItems([...items, response.data]);
        setNewItemName('');
        setNewItemPrice('');
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const handleDeleteItem = (itemId: number) => {
    setLoading(true);
    api
      .delete('/lists/' + listId + '/items/' + itemId)
      .then((response) => {
        setItems(items.filter((item) => item.id !== itemId));
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <IconButton onClick={handleGoBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">{listName}</Typography>
        </Grid>
        <Grid item>
          <TextField
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            label="Nazwa przedmiotu"
            variant="outlined"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item>
          <TextField
            type="number"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
            label="Cena przedmiotu"
            variant="outlined"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddItem}
            startIcon={<AddIcon />}
          >
            Dodaj przedmiot
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={118} />
            ) : (
              items.map((item) => (
                <Card style={{ margin: '10px 0' }} key={item.id}>
                  <ListItem>
                    <ListItemText
                      primary={item.item_name}
                      secondary={`Cena: ${item.item_price}zł`}
                    />
                    <IconButton
                      onClick={() => handleDeleteItem(item.id)}
                      color="secondary"
                      sx={{ m: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                </Card>
              ))
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingList;
