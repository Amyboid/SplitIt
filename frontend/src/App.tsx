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
import Groups from "./views/Groups";
import GroupForm from "./components/group-form";
import GroupDetails from "./components/group-details";
import GroupSettings from "./views/GroupSettings";
import Expenses from "./views/Expenses";

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
        <Route path="/groups" component={Groups} />
        <Route path="/add/group" component={GroupForm} />
        <Route path="/group/:id/details" component={GroupDetails} />
        <Route path="/group/:id/add/expenses" component={ExpenseInput} />
        <Route path="/group/:id/settings" component={GroupSettings} />
        <Route path="/group/:id/expenses" component={Expenses} />
      </ThemeProvider>
    </>
  );
}

export default App;
