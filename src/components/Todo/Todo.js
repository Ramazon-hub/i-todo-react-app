import './Todo.css'
import {  useState } from "react";
import DeleteSvg from '../../detals/DeleteSvg';
import Edit from '../../detals/Edit';

function Todo(){
    const [todo,setTodo] = useState(window.localStorage.getItem("todo")? JSON.parse(window.localStorage.getItem("todo")):[])
    const [value,setValue] = useState("")
    const [edit,setEdit] = useState('')
           const alert = document.querySelector(".alert")
                
    window.localStorage.setItem("todo",JSON.stringify(todo))
    function submit(evt){
             evt.preventDefault();
            if(value.length>2){
                 let id=todo.length?todo[todo.length-1].id:0
                    const newObj={
                            id:id+1,
                            todo:value,
                            isComplated:false
                            }
                    setTodo( [ ...todo,newObj] )

                     if (todo.length>0 && edit.length>0) {
                            todo.forEach(item=>{
                                if(item.todo === edit){
                                    item.todo = value;
                                    setTodo( [ ...todo ] )
                                }
                            })
                
                        }else {
                            setTodo( [ ...todo,newObj ] )
                            
                        }
                     setValue("")
                     alert.textContent = 'Please enter more than 2 characters'
                    alert.style.cssText = `color:green; transform:scale(1);transition:all .5s;`
                        
                }
                
             else{
                    alert.textContent = 'Please enter more than 2 characters ! ! !'
                    alert.style.cssText = `color:red; transform:scale(1.2);transition:all .5s;`
            }
    }
    const check= (evt) =>{
        let findTodo = todo.find(e=>e.id === Number(evt.target.dataset.id))
        setTodo(
            todo.map(item=>{
                if(item.id === findTodo.id)
                {
                    item.isComplated = !item.isComplated  
                }
                return item
            })
        )
    }
    const deleteClick = (evt) =>{
        let findDelete = todo.find(e=>e.id === Number(evt.currentTarget.dataset.id))
        setTodo(
            todo.filter(item=>item.id !== findDelete.id)
                            
        )
    }
    const editTodo = (evt) =>{
        let editTodo = todo.find(e=>e.id === Number(evt.currentTarget.dataset.id) )
        setEdit(editTodo.todo)
        setValue(editTodo.todo)
        document.querySelector(".todo-input").focus()
    }
    return(
        <div className="wrapper">
            <form onSubmit={submit} className="todo-form" >
            <p className="alert">Please enter more than 2 characters</p>
                <input type="text"
                value={value}
                     className="todo-input" 
                     onChange={(e)=>{
                            setValue(e.currentTarget.value);
                            }}  
                    required
                    placeholder="Create todo ..."
                />
                <button className="create-todo-btn">Create todo</button>
                
                    {
                        todo.length>0 && <ul className="todo-list">
                          {
                              todo.map(e=>(
                                  <li key={e.id} className={`todo-list__item ${e.isComplated && "check"}`}>
                                      <input 
                                            type="checkbox"  
                                            data-id={e.id} 
                                            checked={e.isComplated} 
                                            onChange={check} 
                                        />
                                      <p className={`todo__text ${e.isComplated && "check-text"}`}>{e.todo}</p>
                                      <button 
                                      type="button" 
                                      className="edit-todo" 
                                      onClick={editTodo}
                                      data-id={e.id}>
                                          <Edit/>
                                      </button>
                                        <button type="button"
                                        className="delete-todo" 
                                        onClick={deleteClick}
                                        data-id={e.id}>
                                            <DeleteSvg className="del"/>
                                        </button>
                                      </li>

                              ))
                          }
                        </ul>
                    }
            </form>
        </div>
    )
}
export default Todo