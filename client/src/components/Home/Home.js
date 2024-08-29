import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, IconButton, Dialog, DialogContent } from "@material-ui/core";
import ChatIcon from '@mui/icons-material/Chat';
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination";
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';
import { jwtDecode } from 'jwt-decode';
import Chatbot from "../../widgets/Chatbot";



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [openBot, setOpenBot] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const query = useQuery();
  const history = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search, setSearch] = useState(searchQuery || '');
  const [tags, setTags] = useState(query.get('tags') ? query.get('tags').split(',') : []);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery || tags.length) {
      dispatch(getPostsBySearch({ search: searchQuery, tags: tags.join(',') }));
    }
  }, [searchQuery, tags, dispatch]);

  const searchPost = () => {
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history(`/posts/search?searchQuery=${encodeURIComponent(search || 'none')}&tags=${encodeURIComponent(tags.join(','))}`);
    } else {
      history('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  const handleBotToggle = () => {
    if (user) {
      setOpenBot(!openBot);
    } else {
      alert("Please login first.");
    }
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        // Logout logic is not needed
        // You can handle token expiration here, such as redirecting to login
        navigate('/auth');
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [user?.token, navigate]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} md={9} sm={6} >
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} md={3} sm={6}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Places"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className={classes.Paginate}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>

        {/* Floating Chatbot Icon */}
        <IconButton
          className={classes.chatbotIcon}
          onClick={handleBotToggle}
        >
          <ChatIcon fontSize="large" />
        </IconButton>

        {/* Chatbot Widget */}
        <Dialog open={openBot} onClose={handleBotToggle}>
         <Chatbot />
        </Dialog>
      </Container>
    </Grow>
  );
};

export default Home;
