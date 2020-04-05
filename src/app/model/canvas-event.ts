import { CardMetadata } from './card-metadata';

export interface CanvasEvent {
    canvasEventType: CanvasEventType;
}

export interface CardAddedEvent extends CanvasEvent {
    position: {x: string, y: string};
}

export enum CanvasEventType {
    Click = 1,
    RightClick,
    AddCard
}