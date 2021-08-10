import React, { useState, useCallback, useEffect, useContext } from 'react';
import { formatDate, getDateNow } from '../../common';
import { commonStore } from '../../context';

import calendar from '../../images/calendar.png';

function NewTask() {
    const { state, dispatch } = useContext(commonStore);
    const [nameTask, setNameTask] = useState('');
    const [descriptionTask, setDescriptionTask] = useState('');
    const [dateTask, setDateTask] = useState(getDateNow());
    const [piorityTask, setPiorityTask] = useState('normal');
    const onChange = useCallback((e, callback) => {
        callback(e.target.value);
    }, []);

    const addTask = (e) => {
        e.preventDefault();

        const data = {
            id: JSON.parse(state.id) + 1,
            name: nameTask,
            description: descriptionTask,
            date: dateTask,
            piority: piorityTask
        };

        dispatch({type:'ADD_TO_DO_LIST', value: data});
    };

    useEffect(() => {
        if (!localStorage.getItem('_quang_to_do_list')) {
            localStorage.setItem('_quang_to_do_list', JSON.stringify([]));
        }
        if (!localStorage.getItem('_quang_to_do_list_id')) {
            localStorage.setItem('_quang_to_do_list_id', 0);
        }
    }, []);

    return (
        <div className="new-task">
            <h1 className="title">New Task</h1>
            <form onSubmit={addTask}>
                <input placeholder="Add new task ..." type="text" onChange={e => onChange(e, setNameTask)} value={nameTask} required />
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
                <button className="btn-add" type="submit">Add</button>
            </form>
        </div>
    );
}

export default NewTask;
