import { Suspense, useCallback, useState } from "react";

import Header from "./components/Header";
import PageRenderer from "./components/PageRenderer";
import PerformanceProfiler from "./components/PerformanceProfiler";
import Modal from "./ui/Modal";
import Footer from "./components/Footer";

function App() {
  const [page, setPage] = useState("menu");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div className="app">
      <Header setPage={setPage} />
      

      <Suspense fallback={<p className="loading">Loading page...</p>}>
        <PerformanceProfiler page={page}>
          <PageRenderer page={page} />
        </PerformanceProfiler>
      </Suspense>

      <button
        className="modal-button"
        onClick={() => setIsModalOpen(true)}
      >
        Open Dish Modal
      </button>

      {isModalOpen && <Modal onClose={closeModal} />}
      <Footer />
    </div>
    
  );
}

export default App;