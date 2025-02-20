import AddTodoForm from "./AddTodoForm";
import UpdateTodoForm from "./UpdateTodoForm";
import { useSelector } from "react-redux";

const Card = () => {
  const toggleForm = useSelector((state) => state.todos.toggleForm);
  return (
    <div className="w-1/2 h-3/4 min-h-max bg-blue-500 shadow-2xl rounded-lg  items flex flex-col space-y-10 justify-between bg-blue-500">
      <div className="flex flex-col space-y-10 w-full h-3/4 min-h-max p-3">
        {/* Depending of toggleForm either the add form or update form is shown */}
        {toggleForm ? <AddTodoForm /> : <UpdateTodoForm />}
      </div>
    </div>
  );
};

export default Card;
