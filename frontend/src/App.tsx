import { Box, Button, Grid, TextField } from "@mui/material";
import Maps from "./components/maps";
import useWindowDimensions from "./hooks/use-window-dimensions";
import { useForm } from "react-hook-form";
import { IUser, useUserStore } from "./provider";
import { shallow } from "zustand/shallow";
import { axiosApi } from "./services/api-uhuu";
import { useEffect, useState } from "react";
import { StickyHeadTable } from "./components/table";
const defaultMapConfig = {
  gestureHandling: "greedy",
  options: {
    fullscreenControl: false,
  },
  mapContainerStyle: {
    height: "100%",
    width: "100%",
    border: " 0.5px solid #363333",
    borderRadius: "4px",
  },
};

function App() {
  const [setUser, user, getUser] = useUserStore(
    (state) => [state.setUser, state.user, state.getUser],
    shallow
  );
  const [pointsMarker, setPointsMaker] = useState([]);
  const [userAll, setUserAll] = useState<IUser[]>([]);
  const { register, handleSubmit } = useForm();
  const { width } = useWindowDimensions();

  function onSubmit(data: any) {
    setUser(data);
    const user = getUser();
    delete user?.addressString;
    axiosApi
      .post("/user", { ...user })
      .then(({ data }) => {
        setUserAll((oldUser) => [...oldUser, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function resetAll() {
    axiosApi
      .delete("/user")
      .then(({ data }) => {
        console.log(data);
        setUserAll([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    axiosApi
      .get("/user")
      .then(({ data }) => {
        setUserAll(data);
        setPointsMaker(data.map((item: any) => item.address.geolocation));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "5rem 0 0 2rem",
          flexWrap: width < 600 ? "wrap" : "initial",
        }}
      >
        <div style={{ flexDirection: "column", minWidth: "20%" }}>
          <Box
            sx={{
              bgcolor: "#fff",
              height: width < 600 ? "50vh" : "72vh",
              margin: 2,
              padding: 5,
              borderRadius: "4px",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid container item spacing={1}>
                  <Grid item width="100%">
                    <TextField
                      {...register("name")}
                      id="name"
                      label="Nome"
                      variant="outlined"
                      required
                    />{" "}
                  </Grid>
                </Grid>
                <Grid container item spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      {...register("weight")}
                      id="weight"
                      label="Peso da Entrega"
                      variant="outlined"
                      type="number"
                      required
                    />{" "}
                  </Grid>
                </Grid>
                <Grid container item spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      id="address"
                      label="Endereço"
                      variant="outlined"
                      focused
                      required
                      value={user?.addressString || ""}
                    />{" "}
                  </Grid>
                </Grid>
              </Grid>
              <Box mt={4} ml={6.5}>
                <Button type="submit" variant="contained">
                  Cadastrar
                </Button>
              </Box>

              <Box mt={4} ml={3}>
                <Button onClick={resetAll} variant="contained" color="error">
                  resetar cadastro
                </Button>
              </Box>
            </form>
          </Box>
        </div>
        <div style={{ minWidth: "80%" }}>
          <Box
            sx={{
              bgcolor: "#cfe8fc",
              height: "30vh",
              width: "90%",
              margin: 2,
            }}
          >
            <Maps
              defaultMapConfig={defaultMapConfig}
              pointsMarker={pointsMarker}
            />
          </Box>
          <Box
            sx={{
              bgcolor: "#cfe8fc",
              width: "90%",
              margin: 2,
            }}
          >
            {userAll && <StickyHeadTable data={userAll} />}
          </Box>
        </div>
      </div>
    </>
  );
}

export default App;
