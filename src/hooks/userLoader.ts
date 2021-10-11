import {useCallback, useState} from 'react';

type UseLoader = [boolean, () => void, () => void];

/**
 * Boolean state with functions to change the state inmediatly
 * @param initialState Default loading state
 * @returns index 0: loading Bolean
 * @returns index 1: enableLoading function to change state to true inmediatly
 * @returns index 2: disableLoading function to change
 */
export default function useLoader(initialState: boolean = true): UseLoader {
  const [loading, setLoading] = useState<boolean>(initialState);
  const enableLoading = useCallback(() => setLoading(true), []);
  const disableLoading = useCallback(() => setLoading(false), []);
  return [loading, enableLoading, disableLoading];
}
