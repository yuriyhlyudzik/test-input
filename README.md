# What has been changed

- `touchmove` event wasn’t cleared on unmount which led to the memory leak;
- `Input` component was wrapped in a `memo` to avoid rerenders, but `handleBlur` and `handleFocus`  were used without `useCallback` because the cost of re-creating these callbacks on every render is negligible compared to the overhead of `useCallback`;
- Unnecessary `setTimeout` for `handleFocus` was deleted;
- inner and outer refs were synchronized with `useImperativeHandle` ;
- The loader wasn’t working because input could not contain other elements (input::after didn’t render the loader), so a separate div was added for the loader. Also, the UI is not adapted for other types but text, but I guess that’s not what this task is about.
- Test to cover fixes was written