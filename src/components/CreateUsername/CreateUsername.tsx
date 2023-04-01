import { useAuth } from "@/context/AuthContext";
import { getUsername, setUsername } from "@/firebase/db";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

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
    getUsername(username).then((res) => {
      if (res) {
        setError(true);
        setLoading(false);
        throw new Error("username exists")
      }
    }).then(() => {
      setUsername(username, auth?.user?.uid || "").then(() => {
        setLoading(false);
        setError(false);
      });
    }).catch((e) => {console.log(e)})
  };

  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        {isSuccess ? (
          <div>

            <Typography color='success'>Success</Typography>
            <Typography>{'you'}</Typography>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ mb: 1 }}>Create a username</Typography>
            <div style={{display: 'flex'}}>
              <TextField
              fullWidth
                onChange={onChange}
                size="small"
                placeholder="username"
                variant="outlined"
                type="text"
                disabled={isSuccess}
              />
              {isLoading ? (
                <CircularProgress sx={{ marginLeft: 1 }} />
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
              <Typography variant="caption" color={"error"}>
                Username already taken
              </Typography>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
