import SlotMachine from "./SlotMachine";
import { UserProvider } from "./UserContext";
import StatusBar from "./StatusBar";
function App() {
  return (
    <UserProvider>
      <div>
        <SlotMachine />
      </div>
    </UserProvider>
  );
}
export default App;
