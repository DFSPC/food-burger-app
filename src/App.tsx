import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonTabs,
  IonTabBar,
  IonLabel,
  IonTabButton,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          <Route path="/home" render={() => <Home />} exact={true} />
          <Route path="/create" render={() => <Create />} exact={true} />
        </IonRouterOutlet>

        <IonTabBar slot="top">
          <IonTabButton tab="home" href="/home">
            <IonLabel>Burgers</IonLabel>
          </IonTabButton>

          <IonTabButton tab="create" href="/create">
            <IonLabel>Create</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
