import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import api from '../Api/api';

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

    useEffect(() => {
        api.get('/lists/' + listId + '/items')
            .then(response => {
                setItems(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [listId]);

    const handleAddItem = () => {
        api.post('/lists/' + listId + '/items', {
            item_name: newItemName,
            item_price: parseFloat(newItemPrice),
            date_added: new Date(),
        }).then(response => {
            setItems([...items, response.data]);
            setNewItemName('');
            setNewItemPrice('');
        }).catch(error => {
            console.error('There was an error!', error);
        });
    };

    const handleDeleteItem = (itemId: number) => {
        api.delete('/lists/' + listId + '/items/' + itemId)
            .then(response => {
                setItems(items.filter(item => item.id !== itemId));
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <>
            <h1>Lista zakupów</h1>
            <TextField
                value={newItemName}
                onChange={e => setNewItemName(e.target.value)}
                label="Nazwa przedmiotu"
            />
            <TextField
                value={newItemPrice}
                onChange={e => setNewItemPrice(e.target.value)}
                label="Cena przedmiotu"
            />
            <Button onClick={handleAddItem} startIcon={<AddIcon />}>Dodaj przedmiot</Button>
            <List>
                {items.map(item => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.item_name} secondary={'Cena: ' + item.item_price} />
                        <IconButton onClick={() => handleDeleteItem(item.id)} color="secondary">
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default ShoppingList;