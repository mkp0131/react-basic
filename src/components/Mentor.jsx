import { useCallback, useState } from "react";
import { useImmer } from "use-immer";

const iniState = {
  name: "민규",
  title: "개발자",
  mentor: {
    name: "존",
    title: "시니어",
  },
};

const Mentor = () => {
  const [person, updatePerson] = useImmer(iniState);

  const changeMentorName = useCallback(() => {
    const newName = prompt("멘토 이름을 입력해주세요.");

    updatePerson((draft) => {
      draft.mentor.name = newName;
    });
  }, []);

  const changeMentorTitle = useCallback(() => {
    const newTitle = prompt("멘토 타이틀을 입력해주세요.");

    updatePerson((prev) => ({
      ...prev,
      mentor: { ...prev.mentor, title: newTitle },
    }));
  }, []);

  return (
    <div>
      <h1>
        {person.name} {person.title}
      </h1>
      <p>
        {person.name} 멘토는 {person.mentor.name} ({person.mentor.title} 개발자)
      </p>
      <button onClick={changeMentorName}>멘토 이름 바꾸기</button>
      <button onClick={changeMentorTitle}>멘토 타이틀 바꾸기</button>
    </div>
  );
};

export default Mentor;
