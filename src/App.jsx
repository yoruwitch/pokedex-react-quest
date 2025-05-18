import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/Theme";

import Header from "./components/Header";
import GlobalStyle from "./GlobalStyle";
import CardList from "./components/CardList";

function App() {
    const [isDark, setIsDark] = useState(false);
    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <GlobalStyle />
            <Header onToggleTheme={toggleTheme} isDarkTheme={isDark} />
            <CardList/>
        </ThemeProvider>
    );
}

export default App;
