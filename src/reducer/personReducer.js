// action.type 지정
export const CHANGE_MENTOR_NAME = "CHANGE_MENTOR_NAME";
export const ADD_MENTOR = "ADD_MENTOR";
export const REMOVE_MENTOR = "REMOVE_MENTOR";

// 리듀서 함수 / 불변성을 유지
export default function personReducer(prev, action) {
  switch (action.type) {
    case CHANGE_MENTOR_NAME:
      const { mentorName, newName } = action;
      return {
        ...prev,
        mentors: prev.mentors.map((mentor) => {
          if (mentor.name === mentorName) {
            return { ...mentor, name: newName };
          }
          return mentor;
        }),
      };
    case ADD_MENTOR:
      const { newMentor } = action;
      return {
        ...prev,
        mentors: [...prev.mentors, { name: newMentor, title: "시니어" }],
      };

    case REMOVE_MENTOR:
      const { removeMentor } = action;
      return {
        ...prev,
        mentors: prev.mentors.filter((mentor) => mentor.name !== removeMentor),
      };

    default:
      throw Error(`알수없는 액션 타입 입니다. 타입: ${action.type}`);
      break;
  }
}
