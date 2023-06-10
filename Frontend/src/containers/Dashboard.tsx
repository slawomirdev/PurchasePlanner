import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  List,
  ListItemText,
  Typography,
  CircularProgress,
  Card,
  TextField,
  Button,
  Grid,
  IconButton,
  ListItemButton,
  Box,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../Api/api';
import ExpenseSummary from '../components/ExpenseSummary/ExpenseSummary';

type Dashboard = {
  name: string;
  date_created: string;
  id: number;
};

const Dashboard = () => {
  const [cookies] = useCookies(['Email']);
  const userEmail = cookies.Email;
  const navigate = useNavigate();
  const [lists, setLists] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(false);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    if (userEmail) {
      setLoading(true);
      api
        .get('/lists/' + userEmail)
        .then((response) => {
          setLists(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('There was an error!', error);
          setLoading(false);
        });
    }
  }, [userEmail]);

  const handleNewList = () => {
    api
      .post('/lists', {
        user_email: userEmail, // <-- change here
        name: newListName,
        date_created: new Date(),
      })
      .then((response) => {
        setLists([...lists, response.data]);
        setNewListName('');
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const handleDeleteList = (listId: number) => {
    api
      .delete('/lists/' + listId)
      .then((response) => {
        setLists(lists.filter((list) => list.id !== listId));
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const handleListClick = (listId: number) => {
    navigate('/shopping-list/' + listId);
  };

  return (
    <Container maxWidth="sm" sx={{ my: '2rem' }}>
      <Typography align="center" variant="h4" component="h2" gutterBottom>
        Twoje listy zakupów
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8} md={9}>
          <TextField
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            label="Nowa lista"
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{ maxLength: 30 }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Button
            onClick={handleNewList}
            color="primary"
            variant="contained"
            fullWidth
          >
            Dodaj
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ height: '400px', overflow: 'auto', my: '2rem' }}>
          {lists.map(({ id, name, date_created }) => (
            <Card style={{ margin: '10px 0' }} key={id}>
              <ListItemButton onClick={() => handleListClick(id)}>
                <ListItemText
                  primary={name}
                  secondary={`Stworzona ${new Date(
                    date_created
                  ).toLocaleDateString()}`}
                />
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteList(id);
                  }}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemButton>
            </Card>
          ))}
        </List>
      )}
      <Divider />
      <ExpenseSummary lists={lists} />
    </Container>
  );
};

export default Dashboard;
