type Props = {
  setmatching: (matching: string) => void;
  matching: string;
  titling: string;
  settitling: (titling: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setmatching,
  matching,
  titling,
  settitling,
}) => {
  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span
          className="select"
          value={matching}
          onChange={e => setmatching(e.target.value)}
        >
          <select data-cy="statusSelect">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={titling}
          onChange={e => settitling(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {titling && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => settitling('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
