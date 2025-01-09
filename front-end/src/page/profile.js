import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

function ProfilePage() {
  const [isEdited, setIsEdited] = useState(false);
  const [userData, setUserData] = useState(null);
  const [updatedData, setUpdatedData] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditProfile = () => {
    setIsEdited(true);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        "http://localhost:4001/update-profile",
        {
          username: updatedData.username,
          email: updatedData.email,
        },
        { withCredentials: true }
      );

      console.log("Profile updated!");
      // Update userData with the new profile data
      setUserData(response.data.user);

      // After saving, set updatedData to the new userData from server
      setUpdatedData({
        username: response.data.user.username,
        email: response.data.user.email,
      });
      setIsEdited(false);
    } catch (error) {
      console.error("Failed to update data!", error.message);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:4001/retrieve-profile", {
        withCredentials: true,
      });

      setUserData(response.data.user);
      setUpdatedData({
        username: response.data.user.username,
        email: response.data.user.email,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Grid2 container justifyContent="center" alignItems="center" spacing={2}>
        <Grid2 xs={12} sm={8} md={6}>
          <Card>
            <CardContent style={{ textAlign: "center" }}>
              {/* Avatar */}
              <Avatar
                alt="Profile Picture"
                src="https://via.placeholder.com/150"
                style={{ width: 100, height: 100, margin: "0 auto" }}
              />

              {/* Name */}
              <Typography variant="h5" gutterBottom>
                {userData?.username || "Loading..."}
              </Typography>

              {/* Bio */}
              <Typography variant="body2" color="textSecondary" paragraph>
                A brief bio or description about the user.
              </Typography>

              {/* Username */}
              <TextField
                label="Username"
                name="username"
                value={updatedData.username}
                fullWidth
                margin="normal"
                onChange={handleChange}
                disabled={!isEdited}
              />

              {/* Email */}
              <TextField
                label="Email"
                name="email"
                value={updatedData.email}
                fullWidth
                margin="normal"
                onChange={handleChange}
                disabled={!isEdited}
              />

              <Grid2 container justifyContent="center" spacing={1} style={{ marginTop: "10px" }}>
                <Grid2>
                  <Button variant="contained" color="primary" onClick={handleEditProfile}>
                    Edit Profile
                  </Button>
                </Grid2>

                <Grid2>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!isEdited}
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </div>
  );
}

export default ProfilePage;
