import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper,
    Grid,
    Alert,
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from "axios";

function App() {
    const [tasks, setTasks] = useState([]);
    const [todo, setTodo] = useState("");
    const [plan, setPlan] = useState("");
    const [account, setAccount] = useState("");

    useEffect(() => {
        initWeb3();
        fetchTasks();
    }, []);

    const initWeb3 = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setAccount(accounts[0]);
            } catch (error) {
                console.error("Account access denied!");
            }
        } else {
            console.log("Install MetaMask!");
        }
    };

    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:3001/entries");
            console.log(res.data)
            setTasks(res.data);
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!account) await initWeb3();

        try {
            await axios.post("http://localhost:3001/create-entry", {
                todo: todo,
                plan: plan,
                account,
            });
            setTodo("");
            setPlan("");
            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (<
        Container maxWidth={false}
        disableGutters sx={
            { height: "100vh", background: "linear-gradient(135deg, #1e3c72, #2a5298)" }} >
        <
        Box sx={
                { minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#fff" }} >
            <
        Typography variant="h3"
                align="center"
                gutterBottom sx={
                    { fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }} > 🚀Decentralized Todo Master <
        /Typography> {
                    account && (<
                Alert icon={< CheckCircleOutlineIcon fontSize="inherit" />}
                        sx={
                            {
                                backgroundColor: "#e6f4ea",
                                color: "#000",
                                width: "90%",
                                maxWidth: "1200px",
                                mb: 3,
                                borderRadius: "0",
                                padding: "8px 16px",
                                fontSize: "14px",
                                alignItems: "center",
                                '& .MuiAlert-icon': {
                                    marginRight: '8px',
                                    color: '#2e7d32',
                                },
                            }
                        } >
                        Connected Account: {account} <
                /Alert>
                        )
        } <
        Grid container spacing={3}
                            sx={
                                { width: "100%" }} > { /* Left side - Input Form */} <
        Grid item xs={12}
                                    md={5} >
                                <
        Paper elevation={8}
                                    sx={
                                        { p: 4, background: "rgba(255, 255, 255, 0.9)", borderRadius: "15px" }} >
                                    <
        Typography variant="h5"
                                        gutterBottom sx={
                                            { color: "#2a5298", fontWeight: "bold" }} >
                                        Create New Task <
        /Typography> <
        form onSubmit={handleSubmit} >
                                            <
                                                TextField fullWidth label="Todo"
                                                value={todo}
                                                onChange={
                                                    (e) => setTodo(e.target.value)}
                                                margin="normal"
                                                required variant="outlined"
                                                sx={
                                                    { background: "#fff", borderRadius: "5px" }}
                                            /> <
                                                TextField fullWidth label="Plan"
                                                value={plan}
                                                onChange={
                                                    (e) => setPlan(e.target.value)}
                                                margin="normal"
                                                multiline rows={4}
                                                required variant="outlined"
                                                sx={
                                                    { background: "#fff", borderRadius: "5px" }}
                                            /> <
        Button type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth sx={
                                                    { mt: 2, background: "#2a5298", "&:hover": { background: "#1e3c72" }, borderRadius: "5px" }} >
                                                🌟Add Task <
        /Button> <
        /form> <
        /Paper> <
        /Grid>

                                                { /* Right side - Task List */} <
        Grid item xs={12}
                                                    md={7} >
                                                    <
        Paper elevation={8}
                                                        sx={
                                                            { p: 4, background: "rgba(255, 255, 255, 0.9)", borderRadius: "15px", height: "70vh", overflowY: "auto", width: "100%" }} >
                                                        <
        Typography variant="h5"
                                                            gutterBottom sx={
                                                                { color: "#2a5298", fontWeight: "bold" }} >
                                                            Your Awesome Tasks <
        /Typography> <
        List > {
                                                                    tasks.length > 0 ? (
                                                                        tasks.map((task) => (<
                    ListItem key={task.id}
                                                                            sx={
                                                                                {
                                                                                    background: "#f5f5f5",
                                                                                    borderRadius: "10px",
                                                                                    mb: 2,
                                                                                    p: 2,
                                                                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                                                                    transition: "transform 0.2s",
                                                                                    "&:hover": {
                                                                                        transform: "scale(1.02)",
                                                                                    },
                                                                                }
                                                                            } >
                                                                            <
                                                                                ListItemText primary={<
                        Typography variant="h6"
                                                                                    sx={
                                                                                        { color: "#2a5298", fontWeight: "bold" }} > {task.title} <
                        /Typography>
                    }
                                                                                    secondary = {<
                        Typography variant="body2"
                                                                                        sx={
                                                                                            { color: "#666", wordBreak: "break-word" }} > {task.details} <
                        /Typography>
                    }
                    /> <
                    /ListItem>
                                                                                        ))
                                                                                        ) : ( <
                Typography variant="body1"
                                                                                            color="textSecondary"
                                                                                            sx={
                                                                                                { color: "#666", textAlign: "center", py: 2 }} > 🎉No tasks yet!Start adding some!
                                                                                            <
                /Typography>
                                                                                            )
        } <
        /List> <
        /Paper> <
        /Grid> <
        /Grid> <
        /Box> <
        /Container>
                                                                                            );
}

                                                                                            export default App;