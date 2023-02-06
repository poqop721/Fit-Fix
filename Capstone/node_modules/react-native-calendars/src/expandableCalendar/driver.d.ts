import React from 'react';
import { render } from '@testing-library/react-native';
export declare class ExpandableCalendarDriver {
    testID: string;
    element: React.ReactElement;
    renderTree: ReturnType<typeof render>;
    constructor(testID: string, element: React.ReactElement);
    get knobTestID(): string;
    getDayTestID(date: string): string;
    render(element?: React.ReactElement<any, string | React.JSXElementConstructor<any>>): ReturnType<typeof render>;
    getKnob(): ReactTestInstance;
    getExpandableContainer(): ReactTestInstance;
    getDay(date: string): ReactTestInstance;
    toggleKnob(): void;
    isCalendarExpanded(): boolean;
    selectDay(date: string): void;
}
