import "./App.css";
import { ThemeProvider } from "./components/theme-provider"; 
import { Route } from "wouter";
import Dashboard from "./views/Dashboard";
import Notifications from "./views/Notifications";
import Settings from "./views/Settings";
import ExpenseInput from "./views/ExpenseInput";

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/settings" component={Settings} />
        <Route path="/add/expense" component={ExpenseInput} />
      </ThemeProvider>
    </>
  );
}

export default App;
