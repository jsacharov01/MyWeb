import React from "react";
import HomePage from "./pages/HomePage";
import { services } from "./data/services";
import { projects } from "./data/projects";


const App: React.FC = () => {
return (
<>
<HomePage services={services} projects={projects} />
</>
);
};


export default App;