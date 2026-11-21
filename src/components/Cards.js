import React from "react";
import Card from "./Card";
import { useState } from "react";

const Cards = (props) => {
  let courses = props.courses;
  let category = props.category;
  const [likedCourses, setLikedCourses] = useState([]);

  function getCourses() {
    if (!courses) {
      return [];
    }

    if (category === "All") {
      let allCourses = [];
      Object.values(courses).forEach((courseList) => {
        (Array.isArray(courseList) ? courseList : []).forEach((courseData) => {
          allCourses.push(courseData);
        });
      });
      return allCourses;
    } else {
      //main sirf specific categiry ka data array krunga
      return courses[category] || [];
    }
  }

  console.log("Get courses:", getCourses());
  return (
    <div className="cards">
      {getCourses().map((course) => (
        <Card
          key={course.id}
          course={course}
          likedCourses={likedCourses}
          setLikedCourses={setLikedCourses}
        />
      ))}
    </div>
  );
};

export default Cards;
