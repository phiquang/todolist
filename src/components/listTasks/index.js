import React, { useState, useCallback, useEffect, useContext } from 'react';
import { commonStore } from '../../context';
import { formatDate } from '../../common';

import calendar from '../../images/calendar.png';

function ListTasks() {
    const { state, dispatch } = useContext(commonStore);
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [active, setActive] = useState(false);
    const [listCheckBox, setListCheckBox] = useState([]);
    const [detail, setDetail] = useState(-1);

    const [nameTask, setNameTask] = useState('');
    const [descriptionTask, setDescriptionTask] = useState('');
    const [dateTask, setDateTask] = useState();
    const [piorityTask, setPiorityTask] = useState('normal');

    const onChange = useCallback((e, callback) => {
        callback(e.target.value);
    }, []);

    const handleChange = () => {
        setActive(false);
    };

    const openDetail = (index, item) => {
        setDetail(index);
        setNameTask(item.name);
        setDescriptionTask(item.description);
        setDateTask(item.date);
        setPiorityTask(item.piority);
    };

    const deleteItem = (index) => {
        dispatch({ type: 'DELETE_TO_DO_LIST', value: index });
    };

    const deleteBulkAction = () => {
        dispatch({ type: 'BULK_DELETE_TO_DO_LIST', value: listCheckBox });
        setListCheckBox([]);
        const matches = document.querySelectorAll("input[type='checkbox']");
        for (let index = 0; index < matches.length; index++) {
            let element = matches[index];
            element.checked = false;
        }
    };

    const handleCheckBox = (index) => {
        const indexOfList = [...listCheckBox];
        if (indexOfList.includes(index)) {
            indexOfList.splice(indexOfList.indexOf(index), 1);
        } else {
            indexOfList.push(index);
        }
        setListCheckBox(indexOfList);
    };

    const updateTask = (e, id) => {
        e.preventDefault();
        let value = {
            id,
            name: nameTask,
            description: descriptionTask,
            date: dateTask,
            piority: piorityTask
        };
        dispatch({ type: 'UPDATE_TASK', value });
        setDetail(-1);
    };

    useEffect(() => {
        if (search !== '') {
            dispatch({ type: 'SORT_TO_DO_LIST', value: search });
        } else {
            dispatch({ type: 'GET_TO_DO_LIST' });
        }
    }, [search, dispatch]);

    useEffect(() => {
        setData(state.dataToDoList);
    }, [state]);

    useEffect(() => {
        if (listCheckBox.length > 0) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [listCheckBox]);

    useEffect(() => {
        dispatch({ type: 'GET_TO_DO_LIST' });
    }, [dispatch]);

    return (
        <div className="new-task list-tasks">
            <h1 className="title">To Do List</h1>
            <input placeholder="Search" onChange={e => onChange(e, setSearch)} type="text" value={search} />
            <div className="to-do-list">
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index}>
                            <div className="to-do-list-item">
                                <div className="checkbox-custom">
                                    <label>
                                        <input type="checkbox" onChange={() => handleCheckBox(item.id)} />
                                        <span className="checkbox" />
                                    </label>
                                    <h4 className="title-item">{item.name}</h4>
                                </div>
                                <div className="group-button">
                                    <button className="btn btn-detail" onClick={() => openDetail(index, item)}>Detail</button>
                                    <button className="btn btn-remove" onClick={() => deleteItem(item.id)}>Remove</button>
                                </div>
                            </div>
                            {detail === index && (
                                <form onSubmit={e => updateTask(e, item.id)} className="form-update">
                                    <input placeholder="Name task ..." type="text" onChange={e => onChange(e, setNameTask)} value={nameTask} required />
                                    <div className="label">
                                        Description
                                    </div>
                                    <textarea onChange={e => onChange(e, setDescriptionTask)} value={descriptionTask} />
                                    <div className="group-option">
                                        <div className="item-option">
                                            <div className="label">
                                                Due Date
                                            </div>
                                            <div className="item-date">
                                                <span>{formatDate(new Date(dateTask))}</span>
                                                <img alt="calendar" src={calendar} />
                                            </div>
                                            <input type="date" value={dateTask} onChange={e => onChange(e, setDateTask)} />
                                        </div>
                                        <div className="item-option">
                                            <div className="label">
                                                Piority
                                            </div>
                                            <select value={piorityTask} onChange={e => onChange(e, setPiorityTask)}>
                                                <option value="normal">Normal</option>
                                                <option value="special">Special</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button className="btn-add" type="submit">Update</button>
                                </form>
                            )}
                        </div>
                    ))
                )
                :
                <h3 className="notfound">No such as</h3>}
            </div>
            {active && (
                <div className="bulk-action">
                    <div className="content">
                        <span>Bulk Action:</span>
                        <div className="group-action">
                            <button className="btn btn-detail" onClick={handleChange}>Done</button>
                            <button className="btn btn-remove" onClick={deleteBulkAction}>Remove</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ListTasks;
