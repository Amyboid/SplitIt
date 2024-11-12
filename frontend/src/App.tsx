import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import ExpenseInput from "./views/ExpenseInput";
import { Link, Route } from "wouter";
import Groups from "./views/Groups";
import GroupForm from "./components/group-form";

import { ModeToggle } from "@/components/mode-toggle";
function App() {
  const urls = [
    // ["home", "/"],
    ["AddExpense", "/add/expense"],
    ["history", "/history"],
    ["expense", "/expense"],
    ["Groups", "/groups"],
  ];

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Route path="/add/expense" component={ExpenseInput} />
        {/* <Route path="/history" component={ExpenseHistoryView} /> */}
        <Route path="/expense">
          {/* <ExpenseSplit username={localStorage.getItem("payer")} /> */}
        </Route>
        <Route path="/groups" component={Groups} />
        <Route path="/add/group">
          <GroupForm />
        </Route>
        <div className="fixed bottom-14 left-4">
          <ModeToggle />
        </div>
        <Nav links={urls} />
      </ThemeProvider>
    </>
  );
}

function Nav({ links }: any) {
  return (
    <ul className="flex items-center justify-evenly w-full fixed bottom-0 p-4 bg-secondary text-foreground">
      {links.map((e: any, key: any) => (
        <li
          style={{
            listStyleType: "none",
          }}
          key={key}
        >
          <Link href={e[1]}>{e[0]}</Link>
        </li>
      ))}
    </ul>
  );
}

export default App;
