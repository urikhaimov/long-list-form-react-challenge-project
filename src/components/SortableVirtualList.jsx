
import React, { useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Box } from '@mui/material';
import UserRow from '../pages/users/userRow/UserRow';

const ROW_HEIGHT = 140;

const SortableVirtualList = ({
  users,
  onReorder,
  onFieldChange,
  onDelete,
  errorsMap,
  countryOptions
}) => {
  const itemIds = useMemo(() => users.map(user => user.id), [users]);

  const rowPropsList = useMemo(() => {
    return users.map((user) => ({
      key: user.id,
      user,
      errors: errorsMap[user.id] || {}
    }));
  }, [users, errorsMap]);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = users.findIndex(user => user.id === active.id);
    const newIndex = users.findIndex(user => user.id === over.id);
    onReorder(arrayMove(users, oldIndex, newIndex));
  };

  const Row = ({ index, style }) => {
    const { user, errors } = rowPropsList[index];
    return (
      <div style={{ ...style, width: '100%' }}>
        <UserRow
          user={user}
          errors={errors}
          onChange={onFieldChange}
          onDelete={onDelete}
          countryOptions={countryOptions}
        />
      </div>
    );
  };

  return (
    <Box height={600}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <List
            height={600}
            width="100%"
            itemCount={rowPropsList.length}
            itemSize={ROW_HEIGHT}
            itemKey={(index) => rowPropsList[index].key}
          >
            {Row}
          </List>
        </SortableContext>
      </DndContext>
    </Box>
  );
};

export default SortableVirtualList;
