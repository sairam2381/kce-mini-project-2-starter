import React from "react";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { toast } from "react-toastify";
import "./Card.css";

const Card = (props) => {
  let course = props.course;
  let likedCourses = props.likedCourses;
  let setLikedCourses = props.setLikedCourses;
  let key = props.key;
  function clickHandler() {
    if (likedCourses.includes(course.id)) {
      console.log("Am I entering into this or not", likedCourses);
      // setLikedCourses(())
      const arrData = likedCourses.filter((item) => item !== course.id);
      setLikedCourses(arrData);
      toast.warning("Like removed");
    } else {
      if (likedCourses.length === 0) {
        setLikedCourses([course.id]);
      } else {
        setLikedCourses((prev) => [...prev, course.id]);
      }
      toast.success("Post is liked");
    }
  }
  const description = course.description || "";
  return (
    <article className="course-card">
      <div className="course-card__image-wrap">
        <img
          className="course-card__image"
          src={course.image?.url}
          alt={course.image?.alt || course.title}
        />

        <div className="course-card__like">
          <button onClick={clickHandler}>
            {likedCourses.includes(course.id) ? (
              <FcLike fontSize="1.75rem" />
            ) : (
              <FcLikePlaceholder fontSize="1.75rem" />
            )}
          </button>
        </div>
      </div>

      <div className="course-card__body">
        <p className="course-card__title">{course.title}</p>
        <p className="course-card__description">
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </p>
      </div>
    </article>
  );
};

export default Card;
