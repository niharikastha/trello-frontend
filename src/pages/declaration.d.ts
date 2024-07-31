declare module 'react-beautiful-dnd' {
    import * as React from 'react';
  
    export interface DragDropContextProps {
      onDragEnd: (result: DropResult) => void;
      onDragStart?: (initial: DragStart) => void;
      onDragUpdate?: (update: DragUpdate) => void;
      children: React.ReactNode;
    }
  
    export class DragDropContext extends React.Component<DragDropContextProps> {}
  
    export interface DroppableProvided {
      innerRef: React.Ref<HTMLDivElement>;
      placeholder: React.ReactElement | null;
      droppableProps: React.HTMLAttributes<HTMLDivElement>;
    }
  
    export interface DroppableProps {
      droppableId: string;
      children: (provided: DroppableProvided) => React.ReactNode;
      isDropDisabled?: boolean;
      direction?: 'vertical' | 'horizontal';
      type?: string;
    }
  
    export class Droppable extends React.Component<DroppableProps> {}
  
    export interface DraggableProvided {
      innerRef: React.Ref<HTMLDivElement>;
      draggableProps: React.HTMLAttributes<HTMLDivElement>;
      dragHandleProps: React.HTMLAttributes<HTMLDivElement> | null;
    }
  
    export interface DraggableProps {
      draggableId: string;
      index: number;
      children: (provided: DraggableProvided) => React.ReactNode;
      isDragDisabled?: boolean;
      disableInteractiveElementBlocking?: boolean;
      type?: string;
    }
  
    export class Draggable extends React.Component<DraggableProps> {}
  
    export interface DropResult {
      draggableId: string;
      type: string;
      source: DraggableLocation;
      destination?: DraggableLocation;
      reason: 'DROP' | 'CANCEL';
      mode: 'FLUID' | 'SNAP';
    }
  
    export interface DragStart {
      draggableId: string;
      type: string;
      source: DraggableLocation;
      mode: 'FLUID' | 'SNAP';
    }
  
    export interface DragUpdate extends DragStart {
      destination?: DraggableLocation;
    }
  
    export interface DraggableLocation {
      droppableId: string;
      index: number;
    }
  }
  