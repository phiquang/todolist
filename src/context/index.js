import React, { createContext, useReducer } from "react";

const initialState = {
  dataToDoList: [],
  id: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_TO_DO_LIST":
      return {
        ...state,
        dataToDoList: JSON.parse(localStorage.getItem('_quang_to_do_list')),
        id: localStorage.getItem('_quang_to_do_list_id')
      };

    case "ADD_TO_DO_LIST":
        const data = action.value;
        const toDoList = JSON.parse(localStorage.getItem('_quang_to_do_list'));
        const id = JSON.parse(localStorage.getItem('_quang_to_do_list_id'));
        toDoList.push(data);
        localStorage.setItem('_quang_to_do_list', JSON.stringify(toDoList));
        localStorage.setItem('_quang_to_do_list_id', id + 1);
        return {
            ...state,
            dataToDoList: toDoList,
            id: id + 1
        };

    case "DELETE_TO_DO_LIST":
        const idElm = action.value;
        const dataList = JSON.parse(localStorage.getItem('_quang_to_do_list'));
        for (let i = 0; i < dataList.length ; i++) {
            if ( dataList[i].id === idElm ) {
                dataList.splice(i, 1);
            }
        }
        localStorage.setItem('_quang_to_do_list', JSON.stringify(dataList));
        return {
            ...state,
            dataToDoList: dataList
        };

    case "BULK_DELETE_TO_DO_LIST":
        const arr = action.value;
        let dataListBulkAction = JSON.parse(localStorage.getItem('_quang_to_do_list'));
        for (let i = arr.length - 1; i >= 0 ; i--) {
            for (let j = 0; j < dataListBulkAction.length ; j++) {
                if ( dataListBulkAction[j].id === arr[i] ) {
                    dataListBulkAction.splice(j, 1);
                }
            }
        }
        localStorage.setItem('_quang_to_do_list', JSON.stringify(dataListBulkAction));
        return {
            ...state,
            dataToDoList: dataListBulkAction
        };

    case "SORT_TO_DO_LIST":
        const key = action.value;
        let dataListSearch = JSON.parse(localStorage.getItem('_quang_to_do_list'));
        dataListSearch = dataListSearch.filter((item)=>{
            return item.name.toLowerCase().indexOf(key) !== -1;
        })
        return {
            ...state,
            dataToDoList: dataListSearch
        };

    case "UPDATE_TASK":
        let value = action.value;
        let dataListToDo = JSON.parse(localStorage.getItem('_quang_to_do_list'));
        for (let i = 0; i < dataListToDo.length ; i++) {
            if ( dataListToDo[i].id === value.id ) {
                dataListToDo.splice(i, 1);
                dataListToDo.splice(i, 0, value);
            }
        }
        localStorage.setItem('_quang_to_do_list', JSON.stringify(dataListToDo));
        return {
            ...state,
            dataToDoList: dataListToDo
        };

    default:
      return state;
  }
}
const commonStore = createContext(initialState);
const { Provider } = commonStore;

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { commonStore, ContextProvider };
