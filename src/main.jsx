import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/Theme";
import GlobalStyle from "./GlobalStyle";
import App from "./App";
import PokemonDetails from "./components/PokémonDetails";
import { useState } from "react";

// Componente wrapper para controle de tema e rotas
function ThemedApp() {
    const [isDark, setIsDark] = useState(false);
    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <App toggleTheme={toggleTheme} isDark={isDark} />
                        }
                    />
                    <Route
                        path="/pokemon/:id"
                        element={
                            <PokemonDetails
                                toggleTheme={toggleTheme}
                                isDark={isDark}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ThemedApp />);
