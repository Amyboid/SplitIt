import "./App.css";
import { ThemeProvider } from "./components/theme-provider"; 
import Dashboard from "./views/Dashboard";
import ExpenseInput from "./views/ExpenseInput";
import { Link, Route } from "wouter";
import Settings from "./views/Settings";

function App() {
  const urls = [
    // ["home", "/"],
    ["AddExpense", "/add/expense"],
    ["history", "/history"],
    ["expense", "/expense"],
  ];

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Route path="/add/expense" component={ExpenseInput} />
        <Route path="/" component={Dashboard} />
        <Route path="/settings" component={Settings} />
        {/* <Route path="/history" component={ExpenseHistoryView} /> */}
        <Route path="/expense">
          {/* <ExpenseSplit username={localStorage.getItem("payer")} /> */}
        </Route>
        <Nav links={urls} /> 
      </ThemeProvider>
    </>
  );
}

function Nav({ links }: any) {
  interface Styles {
    [key: string]:
      | string
      | "absolute"
      | "relative"
      | "fixed"
      | "sticky"
      | "static"
      | "inherit";
  }
  const styles: Styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "calc(100vw - 3.2rem)",
    height: "50px",
    background: "#8a8a8a",
    position: "fixed",
    bottom: "2rem",
    left: "1.6rem",
    margin: "0",
    padding: "0",
    borderRadius: "12px",
  };

  return (
    <ul style={styles}>
      {links.map((e: any, key: any) => (
        <li
          style={{
            listStyleType: "none",
          }}
          key={key}
        >
          <Link
            style={{
              color: "white",
            }}
            href={e[1]}
          >
            {e[0]}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default App;
