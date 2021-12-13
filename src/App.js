import {Header} from "./components/header";
import {Sidebar} from "./components/sidebar";
import {Main} from "./components/main";

export const App = () => {
    return (
        <div className="App">
            <Header/>
            <Sidebar/>
            <Main/>
        </div>
    );
}
