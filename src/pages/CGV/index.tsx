import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CGV = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container
      id="products"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "70%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          General Conditions of Sale (GCS)
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            marginTop: 2,
          }}
        >
          <Typography component="h6" variant="h6" color="primary">
            Verified on February 17, 2023 - Directorate of Legal and
            Administrative Information (Prime Minister){" "}
          </Typography>
          <Typography component="p" variant="p" color="text.primary">
            Les conditions générales de vente (CGV) vous permettent d'informer
            votre client sur vos conditions de vente d'un produit ou d'une
            prestation de services. Lorsque votre client est un particulier,
            vous devez obligatoirement lui transmettre vos CGV. En revanche, si
            votre client est un professionnel, leur communication est
            obligatoire lorsque votre client les demande.{" "}
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Client professionnel" {...a11yProps(0)} />
              <Tab label="Client particulier" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            Lorsque votre client est un professionnel, vous n'êtes pas obligé
            d'avoir des conditions générales de vente (CGV) mais cela est
            fortement recommandé. Si votre client vous les demande, vous devrez
            les lui fournir. Attention Il ne faut pas confondre les CGV avec les
            conditions générales d'utilisations (CGU). Les CGU servent à donner
            les règles d'utilisation d'un service (par exemple, un site
            internet)
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Les conditions générales de vente (CGV) contiennent un certain
            nombre d'informations qui doivent être données au client avant la
            signature d'un contrat de vente de biens ou de prestations de
            services. Attention Il ne faut pas confondre les CGV avec les
            conditions générales d'utilisations (CGU). Les CGU servent à donner
            les règles d'utilisation d'un service (par exemple, un site
            internet).
          </CustomTabPanel>
        </Box>
      </Box>
    </Container>
  );
};
export default CGV;
