import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersPage from './pages/users/UsersPage';
import StatisticsPage from './pages/statistics/StatisticsPage';
import { Container, AppBar, Toolbar, Button } from '@mui/material';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Users</Button>
          <Button color="inherit" component={Link} to="/statistics">Statistics</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
