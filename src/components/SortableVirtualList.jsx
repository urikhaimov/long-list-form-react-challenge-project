
import React, { useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import UserRow from '../pages/users/userRow/UserRow';

const ROW_HEIGHT = 140;

const SortableItem = ({
  id,
  index,
  user,
  onFieldChange,
  onDelete,
  errors,
  countryOptions
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} data-row={index}>
      <UserRow
        user={user}
        index={index}
        onFieldChange={onFieldChange}
        onDelete={onDelete}
        errors={errors}
        countryOptions={countryOptions}
      />
    </div>
  );
};

const SortableVirtualList = ({
  users,
  onReorder,
  onFieldChange,
  onDelete,
  errorsMap,
  countryOptions
}) => {
  const itemIds = useMemo(() => users.map(user => user.id), [users]);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = users.findIndex(user => user.id === active.id);
    const newIndex = users.findIndex(user => user.id === over.id);
    onReorder(arrayMove(users, oldIndex, newIndex));
  };

  const Row = useCallback(({ index, style }) => {
    const user = users[index];
    if (!user) return null;
    return (
      <div style={{ ...style, width: '100%' }} key={user.id}>
        <SortableItem
          id={user.id}
          index={index}
          user={user}
          onFieldChange={onFieldChange}
          onDelete={onDelete}
          errors={errorsMap[user.id] || {}}
          countryOptions={countryOptions}
        />
      </div>
    );
  }, [users, onFieldChange, onDelete, errorsMap, countryOptions]);

  return (
    <Box height={600}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          <List
            height={600}
            width="100%"
            itemCount={users.length}
            itemSize={ROW_HEIGHT}
            itemKey={(index) => users[index].id}
          >
            {Row}
          </List>
        </SortableContext>
      </DndContext>
    </Box>
  );
};

export default SortableVirtualList;
