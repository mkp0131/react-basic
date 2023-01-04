import { useCallback, useReducer, useState } from "react";
import personReducer, {
  ADD_MENTOR,
  CHANGE_MENTOR_NAME,
  REMOVE_MENTOR,
} from "../reducer/personReducer";

const iniState = {
  name: "민규",
  title: "개발자",
  mentors: [
    {
      name: "존",
      title: "시니어",
    },
    {
      name: "밥",
      title: "시니어",
    },
  ],
};

const Mentors = () => {
  // Reducer 연결
  const [person, dispatch] = useReducer(personReducer, iniState);

  const changeMentorName = useCallback(() => {
    const mentorName = prompt("변경하고 싶은 멘토의 이름을 입력해주세요");
    const newName = prompt("멘토의 새로운 이름을 입력해주세요");
    // Reducer 에서 값을 변경
    dispatch({ type: CHANGE_MENTOR_NAME, mentorName, newName });
  }, []);

  const addMentor = useCallback(() => {
    const newMentor = prompt("새로운 멘토의 이름을 입력해주세요");
    dispatch({ type: ADD_MENTOR, newMentor });
  });

  const removeMentor = useCallback(() => {
    const removeMentor = prompt("삭제하고싶은 멘토의 이름을 입력해주세요");
    dispatch({ type: REMOVE_MENTOR, removeMentor });
  });

  return (
    <div>
      <h1>
        {person.name} {person.title}
      </h1>
      <ul>
        {person.mentors.map((mentor, index) => (
          <li key={index}>
            {mentor.name} ({mentor.title} 개발자)
          </li>
        ))}
      </ul>
      <button onClick={changeMentorName}>멘토 이름 바꾸기</button>
      <button onClick={addMentor}>멘토 추가</button>
      <button onClick={removeMentor}>멘토 삭제</button>
    </div>
  );
};

export default Mentors;
