import React from "react";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import { apiUrl } from "./data";
import { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import { toast } from "react-toastify";

const App = () => {
  const [courses, setCourses] = useState({});
  const [filterData, setFilterData] = useState([{ id: "all", title: "All" }]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }
      const output = await response.json();
      // The API wraps its category keyed course lists in a `data` property.
      const courseData = output?.data;
      if (
        !courseData ||
        typeof courseData !== "object" ||
        Array.isArray(courseData) ||
        !Object.values(courseData).every(Array.isArray)
      ) {
        throw new Error("The API returned an unexpected courses response");
      }

      const categories = Object.keys(courseData);
      setCourses(courseData);
      setFilterData([
        { id: "all", title: "All" },
        ...categories.map((title) => ({ id: title, title })),
      ]);
      setCategory("All");
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      const message =
        error instanceof Error ? error.message : "Unknown request error";
      toast.error(`Unable to load courses: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <div>
        <Navbar />
      </div>
      <main className="app__content">
        <div>
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div className="app__courses">
          {loading ? (
            <Spinner />
          ) : (
            <Cards courses={courses} category={category} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
