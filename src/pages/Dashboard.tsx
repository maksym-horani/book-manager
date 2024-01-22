import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import './styles.css';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookManager from "../components/BookManager";
import Overview from "../components/Dashboard/Overview";
import Reading from "../components/Dashboard/Reading";
import { useBooks } from "../hooks/useBooks";
import { ReadingStatus, BookSize } from "../types";
const drawerWidth = 240;

const Dashboard: React.FC = () => {
  const { books, addBook} = useBooks();

  const fillWithDummy = () => {
    const initialValue =  {
      id: Date.now(),
      title: '',
      author: '',
      iban: '',
      publishedDate: '',
      addedDate: new Date().toISOString().split('T')[0],
      readingStatus: ReadingStatus.None,
      category: [],
      bookSize: BookSize.Other,
      description: '',
      price: 0,
      quantity: 1,
      rating: 0,
    };
    for(let i = 1; i <= 10; i++) {
      const r = Math.random();
      const value = {...initialValue,
        id: initialValue.id + i, title: 'Book' + i,
        readingStatus: r > 0.7 ? ReadingStatus.None : (r > 0.4 ? ReadingStatus.InProgress: ReadingStatus.Finished),
        rating: Math.floor(Math.random() * 5)
      };
      addBook(value);
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#ffffff", color:"black"}} elevation={1}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Personal Library Manager
          </Typography>
          <Avatar alt="Guest" />
          <Typography variant="subtitle1" noWrap component="div" sx={{ marginLeft: 2 }}>
            Guest
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer      
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block', xl: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button selected>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'auto', background:'#f1f3f6'}} minHeight={"calc(100vh - 48px)"}>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Card sx={{borderRadius:3, maxWidth:"100%", p:4}} className="welcome">
              <CardContent>
                <Typography fontSize={62} color={"teal"}>
                  Welcome Back!
                </Typography>
                <Button variant="contained" size="large" color="error" onClick={fillWithDummy}>Fill With Dummy Data!</Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Card sx={{borderRadius:3}}>
              <CardContent>
                <Typography variant="h5" component="h2">
                 Reading Books
                </Typography>
                <Reading/>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={8}>
            <Card sx={{borderRadius:3, maxWidth:"100%"}}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Recently Added Books
                </Typography>
                <Overview/>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} md={6} lg={12}>
                <Card sx={{borderRadius:3, p:3}}>
                  <CardContent>
                    <Grid container spacing={1} justifyContent={"center"} alignItems={"center"}>
                      <Grid item sm={4}>
                        <Typography sx={{fontSize:64, textAlign:"center"}}>
                          {books?.length}
                        </Typography>
                      </Grid>
                      <Grid item sm={8} alignItems="center" justifyContent={"center"} display={"flex"}>
                        <Typography  sx={{fontSize:32, textAlign:"center"}}>
                          Total Books
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={12}>
                <Card sx={{borderRadius:3, p:3}}>
                  <CardContent>
                    <Grid container spacing={1} justifyContent={"center"} alignItems={"center"}>
                      <Grid item sm={4}>
                        <Typography sx={{fontSize:64, textAlign:"center"}}>
                          {books?.filter(book => book.readingStatus === ReadingStatus.InProgress).length}
                        </Typography>
                      </Grid>
                      <Grid item sm={8} alignItems="center" justifyContent={"center"} display={"flex"}>
                        <Typography  sx={{fontSize:32, textAlign:"center"}}>
                          Reading Books
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12}>
            <Card sx={{borderRadius:3}}>
              <CardContent>
                <Typography variant="h5" component="h2" mb={2}>
                  Book Manager
                </Typography>
                <BookManager/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;