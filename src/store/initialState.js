import { storage } from '@core/utils';
import { defaultStyles, defaultTitle } from '@/constants';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    title: defaultTitle,
    currentText: '',
    currentStyles: defaultStyles,
};

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
});

export const initialState = normalize(storage('excel-state') || defaultState);
