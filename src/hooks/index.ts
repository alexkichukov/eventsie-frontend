import { useDispatch as useDispatchHook, useSelector as useSelectorHook } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'

export const useDispatch: () => AppDispatch = useDispatchHook
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorHook
