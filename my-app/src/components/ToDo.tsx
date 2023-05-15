import {useSetRecoilState} from "recoil";
import {Categories, IToDo, toDoState} from "../atoms";

function ToDo({text, id, category}: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: {name}
    } = event;
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDo = {text, id, category: name as any};
      return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
    });  
  };
  const onDelete= (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDos = [...oldToDos];
      newToDos.splice(targetIndex, 1);
      return newToDos;
    });
  };
  
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && <button name = {Categories.TO_DO} onClick = {onClick}>To do</button>}
      {category !== Categories.DOING && <button name = {Categories.DOING} onClick = {onClick}>Doing</button>}
      {category !== Categories.DONE && <button name = {Categories.DONE} onClick = {onClick}>Done</button>}
      <button onClick = {onDelete}>delete it</button>
    </li>
  );
}

export default ToDo;