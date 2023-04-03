import { useAuth } from "@/context/AuthContext";
import { getUsername, setUsername } from "@/firebase/db";
import { ErrorOutline, Home } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./CreateUsername.module.css";
export const CreateUsername: React.FC = () => {
  const auth = useAuth();

  const [isLoading, setLoading] = React.useState(false);
  const [hasError, setError] = React.useState(false);
  const [username, setUsernameChange] = React.useState("");
  const [isSuccess, setSuccess] = React.useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameChange(e.target.value);
  };

  const onSubmit = () => {
    setError(false);
    setLoading(true);
    getUsername(username)
      .then((res) => {
        if (res) {
          setError(true);
          setLoading(false);
          throw new Error("username exists");
        }
      })
      .then(() => {
        setUsername(username, auth?.user?.uid || "").then(() => {
          setLoading(false);
          setError(false);
        });
      })
      .catch((e) => {
        // todo
        console.log(e);
      });
  };

  return (
    <Card className={styles.container}>
      <CardContent>
        {isSuccess ? (
          <div>
            <Typography fontWeight={600} mb={1} variant="body2">
              Welcome to the party {username} 🎉
            </Typography>
            <Typography variant="body2">
              On the bottom right side, that's where your menu is. Have fun
              exploring!
            </Typography>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: 'column' }}>
            <div style={{ display: "flex", alignItems: 'center' }}>
              <TextField
                fullWidth
                onChange={onChange}
                size="small"
                placeholder="Create your username"
                variant="outlined"
                type="text"
                disabled={isSuccess}
              />

              {isLoading ? (
                <IconButton size='small'>

                <CircularProgress sx={{ marginLeft: 1 }} />
                </IconButton>
              ) : (
                <Button
                  onClick={onSubmit}
                  variant="contained"
                  sx={{ marginLeft: 1 }}
                >
                  create
                </Button>
              )}
            </div>
           
            {hasError && (

              <Typography sx={{display: 'flex', alignItems: 'center'}} variant="body2" m={1} color={"error"}>
               <ErrorOutline sx={{mr:1}}/> Username already taken
              </Typography>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
