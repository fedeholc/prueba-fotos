import { useEffect, useState } from "react";
import "./App.css";
import foto1 from "./assets/a.webp";
import foto2 from "./assets/b.webp";
import react from "./assets/react.svg";

// https://blog.logrocket.com/guide-css-object-view-box/ zoom pan

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const imagesList = [foto1, foto2, react];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      if (event.key === "ArrowRight") {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === imagesList.length - 1 ? 0 : prevIndex + 1
        );
      }
      if (event.key === "ArrowLeft") {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? imagesList.length - 1 : prevIndex - 1
        );
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imagesList.length]);

  return (
    <>
      {imagesList &&
        imagesList.length > 0 &&
        imagesList.map((image, index) => (
          <img
            height="250px"
            key={index}
            src={image}
            alt={`Foto ${index + 1}`}
            onClick={() => {
              setCurrentImageIndex(index);
              setIsOpen(true);
            }}
          />
        ))}

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
            <div className="pic__top-controls">
              <button onClick={() => setIsOpen(false)}>&#10008;</button>
            </div>
            <div className="pic__right-controls">
              <button
                onClick={() => {
                  setCurrentImageIndex((prevIndex) =>
                    prevIndex === imagesList.length - 1 ? 0 : prevIndex + 1
                  );
                }}
              >
                &#10095;
              </button>
            </div>
            <div className="pic__left-controls">
              <button
                onClick={() => {
                  setCurrentImageIndex((prevIndex) =>
                    prevIndex === 0 ? imagesList.length - 1 : prevIndex - 1
                  );
                }}
              >
                &#10094;
              </button>
            </div>
            <div className="pic__bottom-controls">
              <button
                onClick={() => {
                  const img = document.querySelector(
                    "#img" + currentImageIndex.toString()
                  );
                  if (img && img instanceof HTMLImageElement) {
                    img.style.transform = `rotate(${
                      (parseFloat(
                        img.style.transform
                          .replace("rotate(", "")
                          .replace("deg)", "")
                      ) || 0) + 90
                    }deg)`;
                  }
                }}
              >
                Rotate Right
              </button>
            </div>
            <img
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
              id={"img" + currentImageIndex.toString()}
              src={imagesList[currentImageIndex]}
              alt={`Foto ${currentImageIndex + 1}`}
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
