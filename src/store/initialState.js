import { defaultStyles, defaultTitle } from '@/constants';
import { clone } from '@/core/utils';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    title: defaultTitle,
    currentText: '',
    currentStyles: defaultStyles,
    openedDate: new Date().toJSON(),
};

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
});

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState);
}
