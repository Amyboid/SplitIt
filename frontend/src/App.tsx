import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Route } from "wouter";
import Home from "./views/Home";
import Auth from "./views/Auth";
import Onboarding from "./views/Onboarding";
import Dashboard from "./views/Dashboard";
import Notifications from "./views/Notifications";
import Settings from "./views/Settings";
import ExpenseInput from "./views/ExpenseInput";



function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="preferred-ui-theme">
        <Route path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/notification" component={Notifications} />
        <Route path="/settings" component={Settings} />
        <Route path="/add/expense" component={ExpenseInput} />
      </ThemeProvider>
    </>
  );
}

export default App;
