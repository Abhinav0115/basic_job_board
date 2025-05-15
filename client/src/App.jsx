import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Homes";
import JobDetails from "./pages/JobDetails";
import "./App.css";

export default function App() {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();

    const isJobDetailsPage = location.pathname.startsWith("/job/");

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow">
                <nav className="container mx-auto p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-emerald-600">
                        JobBoard
                    </h1>
                    {!isJobDetailsPage && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                        >
                            + Add New Job
                        </button>
                    )}
                </nav>
            </header>

            <main className="container mx-auto p-4">
                <Routes />
            </main>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            showModal={showModal}
                            setShowModal={setShowModal}
                        />
                    }
                />
                {/* <Route path="/add-job" element={<AddJob />} /> */}
                <Route path="/job/:id" element={<JobDetails />} />
            </Routes>
            <div className="mt-14">
                <footer className="bg-white shadow mt-4 fixed bottom-0 w-full">
                    <div className="container mx-auto p-4 text-center">
                        <p className="text-gray-600">
                            &copy; 2023 JobBoard. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
