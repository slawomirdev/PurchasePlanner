import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import ShoppingList from './pages/ShoppingList';
import NotFound from './pages/NotFound';
import { ColorModeProvider } from './contexts/colorModeContext';

export const App = () => {
  return (
    <ColorModeProvider>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/shopping-list/:id" element={<ShoppingList />} />
        </Routes>
      </BrowserRouter>
    </ColorModeProvider>
  );
};
