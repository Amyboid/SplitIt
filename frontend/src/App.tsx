import "./App.css";
import { ThemeProvider } from "./components/theme-provider"; 
import { Route } from "wouter";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import Notifications from "./views/Notifications";
import Settings from "./views/Settings";
import ExpenseInput from "./views/ExpenseInput";

function App() {

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Route path="/" component={Home}/>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/notification" component={Notifications} />
      <Route path="/settings" component={Settings} />
      <Route path="/add/expense" component={ExpenseInput} />
      <Route path="/auth" component={Auth} />
    </ThemeProvider>
    </>
  );
}

export default App;
