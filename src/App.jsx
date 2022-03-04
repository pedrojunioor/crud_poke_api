import { AppRoutes } from './Routes'
import { AuthProvider } from './context/AuthContext'
import { PokedexContext } from './context/PokedexContext';

import history from './history'

function App() {
    return (
        <div>
            <AuthProvider>
                <PokedexContext>
                    <AppRoutes history={history} />
                </PokedexContext>
            </AuthProvider>
        </div>
    );
}

export default App;
