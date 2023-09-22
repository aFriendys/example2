import { debounce } from "lodash";

const memoizedPosition = {}

export function useScrollPosition(page) {
    const onScrollHandler = debounce((e)=>{
        memoizedPosition[page] = e.target.scrollTop
    }, 300)

    return [memoizedPosition[page], onScrollHandler];
};