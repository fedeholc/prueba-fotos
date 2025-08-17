import { useState } from "react";
import "./App.css";
import foto1 from "./assets/a.webp";

// https://blog.logrocket.com/guide-css-object-view-box/ zoom pan

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <Modal>
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <button onClick={() => setIsOpen(false)}>Close Modal</button>
            </div>
            <img
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
              src={foto1}
              alt="Foto 1"
            />
          </div>
        </Modal>
      )}
    </>
  );
}

function Modal({ children }: { children?: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        width: "100vw",
        height: "100vh",
        textAlign: "center",
        position: "fixed",
        zIndex: 1000,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {children || "This is a modal dialog!"}
    </div>
  );
}

export default App;
