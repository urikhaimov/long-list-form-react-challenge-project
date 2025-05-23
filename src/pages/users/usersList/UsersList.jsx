import { Button, Typography } from '@mui/material';
import { useUsersContext } from '../../../context/usersContext';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import styles from '../../users/users.module.css';
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style, data }) => {
  const { users, onFieldChange, onDelete, errorsMap } = data;
  return (
    <div style={style}>
      <UserRow
        user={users[index]}
        index={index}
        onFieldChange={onFieldChange}
        onDelete={onDelete}
        errors={errorsMap[index]}
      />
    </div>
  );
};

const UsersList = ({ users, onFieldChange, onDelete, errorsMap }) => {
  const height = Math.min(600, users.length * 80); // adapt height to list size
  return (
    <List
      height={height}
      itemCount={users.length}
      itemSize={85}
      width="100%"
      itemData={{ users, onFieldChange, onDelete, errorsMap }}
    >
      {Row}
    </List>
  );
};

export default UsersList;
