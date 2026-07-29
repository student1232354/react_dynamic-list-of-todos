/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [array, setArray] = useState<Todo[]>([]);
  const [loading, setloading] = useState(true);
  const [newarray, setnewarray] = useState<Todo | null>(null);

  const [matching, setmatching] = useState('all');
  const [titling, settitling] = useState('');

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => {
        setArray(fetchedTodos);
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  const PreparedArray = array.filter(obj => {
    const fExam =
      matching === 'all' ||
      (matching === 'active' && !obj.completed) ||
      (matching === 'completed' && obj.completed);

    const sExam = obj.title
      .toLowerCase()
      .includes(titling.toLowerCase().trim());

    return fExam && sExam;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setmatching={setmatching}
                matching={matching}
                titling={titling}
                settitling={settitling}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  array={PreparedArray}
                  selectedTodo={newarray}
                  onselect={setnewarray}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {newarray && (
        <TodoModal selectedobj={newarray} OnClose={() => setnewarray(null)} />
      )}
      ;
    </>
  );
};
